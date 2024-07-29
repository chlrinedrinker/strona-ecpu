<script lang="ts">
    import { onMount } from 'svelte';
    import Uzytkownik from "./Uzytkownik.svelte";
    import ShowLogs from './ShowLogs.svelte';
    import { writable } from 'svelte/store';
    import { fade, slide } from 'svelte/transition';

    interface Pracownik {
      _id: string;
      imie: string;
      nazwisko: string;
      stanowisko: string;
    }

    let pracownicy: Pracownik[] = [];
    let selectedUser: Pracownik | null = null;
    let logowania: { _id: string; date: string; entrence_time: string; exit_time: string; hours: number }[] = [];
    let error: string | null = null;

    // Create a store to control visibility of ShowLogs
    const showLogs = writable(false);

    onMount(async () => {
      try {
        const response = await fetch('/endpoints/ImieNazStanow');
        if (response.ok) {
          pracownicy = await response.json();
        } else {
          error = 'Nie udało się załadować pracowników';
        }
      } catch (err) {
        error = 'Błąd podczas ładowania pracowników';
      }
    });

    async function handleSelect(event: CustomEvent<Pracownik>) {
      const selected = event.detail;

      if (selectedUser && selectedUser.imie === selected.imie && selectedUser.nazwisko === selected.nazwisko) {
        showLogs.set(false); // Collapse the logs section
        selectedUser = null;
        logowania = [];
        return;
      }

      selectedUser = selected;
      showLogs.set(true); // Expand the logs section

      if (selectedUser) {
        try {
          const response = await fetch(`/endpoints/CzasPracy?imie=${encodeURIComponent(selectedUser.imie)}&nazwisko=${encodeURIComponent(selectedUser.nazwisko)}`);
          if (!response.ok) {
            const errorText = await response.text();
            console.error(`Failed to fetch logs: ${response.status} ${response.statusText} - ${errorText}`);
            error = 'Nie udało się załadować logów';
            return;
          }
          logowania = await response.json();
          filterLogs("month"); // Automatycznie filtruje logi po bieżącym miesiącu
        } catch (err) {
          console.error('Błąd podczas ładowania logów:', err);
          error = 'Błąd podczas ładowania logów';
        }
      }
    }

    function filterLogs(range: string) {
      const now = new Date();
      let startDate: Date;
      let endDate: Date = new Date(now);

      if (range === "today") {
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      } else if (range === "week") {
        const startOfWeek = new Date(now);
        const dayOfWeek = startOfWeek.getDay() || 7;
        startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek + 1);
        startDate = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate());
      } else if (range === "month") {
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      }

      logowania = logowania.filter(log => {
        const logDate = new Date(log.date);
        return logDate >= startDate && logDate <= endDate;
      });
    }
</script>

<div class="w-64 overflow-scroll h-screen">
  {#each pracownicy as user}
    <Uzytkownik 
      imie={user.imie} 
      nazwisko={user.nazwisko} 
      stanowisko={user.stanowisko} 
      on:select={handleSelect}
      selected={selectedUser && selectedUser.imie === user.imie && selectedUser.nazwisko === user.nazwisko} 
    />
  {/each}
</div>

{#if selectedUser}
  <div class="overflow-scroll h-screen" transition:slide={{ duration: 200 }}>
    <ShowLogs {logowania} {selectedUser} />
  </div>
{/if}

{#if error}
  <div class="text-red-500">{error}</div>
{/if}


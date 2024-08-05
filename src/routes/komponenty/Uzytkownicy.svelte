<script lang="ts">
  import Uzytkownik from "./Uzytkownik.svelte";
  import ShowLogs from './ShowLogs.svelte';
  import { writable } from 'svelte/store';
  import { slide } from 'svelte/transition';
  import NavbarKalendarz from './NavbarKalendarz.svelte';
  export let pracownicy;

  interface Pracownik {
    _id: string;
    imie: string;
    nazwisko: string;
    stanowisko: string;
  }

  interface Logowanie {
    date: string;
    entrence_time: string;
    exit_time: string;
    hours: number;
  }

  let logowaniaStore = writable<{ [key: string]: Logowanie[] }>({});
  let selectedUser: Pracownik | null = null;
  let error: string | null = null;
  const showLogs = writable(false);
  const isLoading = writable(true); // Loading state

  async function fetchLogsForUser(user: Pracownik) {
    try {
      const response = await fetch(`/endpoints/CzasPracy?imie=${encodeURIComponent(user.imie)}&nazwisko=${encodeURIComponent(user.nazwisko)}`);
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Failed to fetch logs: ${response.status} ${response.statusText} - ${errorText}`);
        error = 'Nie udało się załadować logów';
        return [];
      }
      return await response.json();
    } catch (err) {
      console.error('Błąd podczas ładowania logów:', err);
      error = 'Błąd podczas ładowania logów';
      return [];
    }
  }

  function isUserActive(logs: Logowanie[]) {
    const today = '2024-07-29'//new Date().toISOString().split('T')[0];
    return logs.some(log => log.date === today && log.entrence_time === log.exit_time);
  }

  async function handleSelect(event: CustomEvent<Pracownik>) {
    const selected = event.detail;

    if (selectedUser && selectedUser.imie === selected.imie && selectedUser.nazwisko === selected.nazwisko) {
      showLogs.set(false);
      selectedUser = null;
      return;
    }

    selectedUser = selected;
    showLogs.set(true);

    if (selectedUser) {
      const userLogs = await fetchLogsForUser(selectedUser);
      logowaniaStore.update(logs => {
        logs[selectedUser._id] = userLogs;
        return logs;
      });
    }
  }

  // Fetch logs for all users on component load
  async function fetchAllLogs() {
    const allLogs = {};
    for (const user of pracownicy) {
      allLogs[user._id] = await fetchLogsForUser(user);
    }
    logowaniaStore.set(allLogs);
    isLoading.set(false); // Set loading to false when done
  }

  fetchAllLogs();
</script>

<div class="w-64 overflow-scroll h-screen">
  {#if $isLoading}
    <div>Loading...</div>
  {:else}
    {#each pracownicy as user}
      <Uzytkownik 
        imie={user.imie} 
        nazwisko={user.nazwisko} 
        stanowisko={user.stanowisko} 
        on:select={handleSelect}
        selected={selectedUser && selectedUser.imie === user.imie && selectedUser.nazwisko === user.nazwisko} 
        active={$logowaniaStore[user._id] && isUserActive($logowaniaStore[user._id])} 
      />
    {/each}
  {/if}
</div>

{#if selectedUser}
  <div class="overflow-scroll h-screen" transition:slide={{ duration: 200 }}>
    <ShowLogs logowania={$logowaniaStore[selectedUser._id]} {selectedUser} />
  </div>
  <div class="outer-container flex flex-col min-h-screen">
    <div class="header-container flex items-center justify-between p-4 relative bg-white">
      <NavbarKalendarz logowania={$logowaniaStore[selectedUser._id]} />
    </div>
  </div>
{/if}

{#if error}
  <div class="text-red-500">{error}</div>
{/if}

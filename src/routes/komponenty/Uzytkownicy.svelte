<script lang="ts">
  import { onMount } from 'svelte';
  import Uzytkownik from "./Uzytkownik.svelte";
  import ShowLogs from './ShowLogs.svelte';
  import { writable } from 'svelte/store';
  import { fade, slide } from 'svelte/transition';
  import { userType, imieNazwisko} from '../stores/stores';
  export let pracownicy;

  interface Pracownik {
    _id: string;
    imie: string;
    nazwisko: string;
    stanowisko: string;
  }

  let logowania: { date: string; entrence_time: string; exit_time: string; hours: number }[] = [];

  let selectedUser: Pracownik | null = null; // Currently selected user
  let error: string | null = null; // Error message
  // Create a store to control visibility of ShowLogs
  const showLogs = writable(false);

  // Fetch employees on component mount

  // Handle user selection
  async function handleSelect(event: CustomEvent<Pracownik>) {
    const selected = event.detail;

    // If the same user is selected again, collapse the logs section
    if (selectedUser && selectedUser.imie === selected.imie && selectedUser.nazwisko === selected.nazwisko) {
      showLogs.set(false); // Collapse the logs section
      selectedUser = null;
      logowania = [];
      return;
    }

    selectedUser = selected; // Set the selected user
    showLogs.set(true); // Expand the logs section

    if (selectedUser) {
      try {
        const response = await fetch(`/endpoints/CzasPracy?imie=${encodeURIComponent(selectedUser.imie)}&nazwisko=${encodeURIComponent(selectedUser.nazwisko)}`);
        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Failed to fetch logs: ${response.status} ${response.statusText} - ${errorText}`);
          error = 'Failed to load logs'; // Set error message if the request fails
          return;
        }
        logowania = await response.json(); // Store the fetched logs
        filterLogs("month"); // Automatically filter logs for the current month
      } catch (err) {
        console.error('Error loading logs:', err);
        error = 'Error loading logs'; // Set error message if an exception occurs
      }
    }
  }

  // Function to filter logs based on the selected range
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


        // Filter logs based on the start and end date
    logowania = logowania.filter(log => {
      const logDate = new Date(log.date);
      return logDate >= startDate && logDate <= endDate;
    });
  }

  console.log($imieNazwisko)



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

<!-- Show logs section if a user is selected -->
{#if selectedUser}
  <div class="overflow-scroll h-screen" transition:slide={{ duration: 200 }}>
    <ShowLogs {logowania} {selectedUser} />
  </div>
{/if}

<!-- Show error message if any error occurs -->
{#if error}
<div class="text-red-500">{error}</div>
{/if}


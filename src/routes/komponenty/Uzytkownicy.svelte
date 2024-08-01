<script lang="ts">
  import { onMount } from 'svelte';
  import Uzytkownik from "./Uzytkownik.svelte";
  import ShowLogs from './ShowLogs.svelte';
  import { writable } from 'svelte/store';
  import { fade, slide } from 'svelte/transition';
  import { userType, imieNazwisko} from '../stores/stores';
  import NavbarKalendarz from './NavbarKalendarz.svelte';
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
        console.log("selected User")
        const response = await fetch(`/endpoints/CzasPracy?imie=${encodeURIComponent(selectedUser.imie)}&nazwisko=${encodeURIComponent(selectedUser.nazwisko)}`);
        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Failed to fetch logs: ${response.status} ${response.statusText} - ${errorText}`);
          error = 'Nie udało się załadować logów';
          return;
        }
        logowania = await response.json();
        
      } catch (err) {
        console.error('Błąd podczas ładowania logów:', err);
        error = 'Błąd podczas ładowania logów';
      }
    }
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
<div class="outer-container flex flex-col min-h-screen">
  <div class="header-container flex items-center justify-between p-4 relative bg-white">
    <NavbarKalendarz {logowania} /> <!-- Pass logowania to Navbar -->
  </div>
</div>

{/if}

{#if error}
<div class="text-red-500">{error}</div>
{/if}

<script lang="ts">
    import Uzytkownik from '../komponenty/Uzytkownik.svelte';
    import KontoZmiany from '../komponenty/KontoZmiany.svelte';
    import { writable } from 'svelte/store';
    import { slide } from 'svelte/transition';
    import type { PageData } from '../$types';
    export let data: PageData;
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
  
    async function handleSelect(event: CustomEvent<Pracownik>) {
      const selected = event.detail;
  
      if (selectedUser && selectedUser.imie === selected.imie && selectedUser.nazwisko === selected.nazwisko) {
        showLogs.set(false); // Collapse the logs section
        selectedUser = null;
        logowania = [];
        return;
      }
      selectedUser = selected;
      $showLogs = true; // Expand the logs section
    }
  </script>
  
  <div class="w-64 overflow-scroll h-screen">
    
    {#each data.pracownicy as user}
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
    <KontoZmiany selectedUser={selectedUser}/>
  </div>
  
  {/if}
  
  {#if error}
  <div class="text-red-500">{error}</div>
  {/if}
  
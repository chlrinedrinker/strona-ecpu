<script lang="ts">
    import { onMount } from 'svelte';
    import Uzytkownik from "./Uzytkownik.svelte";
    import ShowLogs from './ShowLogs.svelte';
  
    interface Pracownik {
        _id: string;
        imie: string;
        nazwisko: string;
        stanowisko: string;
    }
  
    let pracownicy: Pracownik[] = [];
    let selectedUser: Pracownik | null = null;
    let logowania: { date: string; entrence_time: string; exit_time: string; hours: number }[] = [];
    let error: string | null = null;
  
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
      
      if (selectedUser && selectedUser._id === selected._id) {
          // Toggle off if the same user is clicked
          selectedUser = null;
          logowania = [];
          return;
      }
  
      selectedUser = selected;
  
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
          } catch (err) {
              console.error('Błąd podczas ładowania logów:', err);
              error = 'Błąd podczas ładowania logów';
          }
      }
    } 
  </script>
  
  <div class="w-64">
    {#each pracownicy as user}
        <Uzytkownik 
            imie={user.imie} 
            nazwisko={user.nazwisko} 
            stanowisko={user.stanowisko} 
            on:select={handleSelect} 
        />
    {/each}
  </div>
  
  {#if selectedUser}
    <ShowLogs {logowania} />
  {/if}
  
  {#if error}
    <div class="text-red-500">{error}</div>
  {/if}
  
  <style>
    .btn {
        @apply px-4 py-2 bg-blue-500 text-white rounded;
    }
    .cursor-pointer {
        cursor: pointer;
    }
  </style>
  
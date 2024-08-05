<script lang="ts">
    import Uzytkownik from '../komponenty/Uzytkownik.svelte';
    import KontoZmiany from '../komponenty/KontoZmiany.svelte';
    import { writable } from 'svelte/store';
    import { slide } from 'svelte/transition';
    import type { PageData } from '../$types';
    import { enhance } from '$app/forms';
    import Modal from '../komponenty/Modal.svelte';
    export let data: PageData;
    interface Pracownik {
      _id: string;
      imie: string;
      nazwisko: string;
      stanowisko: string;
    }
  
    let showModal = false
    let logowania: { date: string; entrence_time: string; exit_time: string; hours: number }[] = [];
  
    let selectedUser: Pracownik | null = null; // Currently selected user
    let error: string | null = null; // Error message
    // Create a store to control visibility of ShowLogs
    const showLogs = writable(false);
  
    async function handleSelect(event: CustomEvent<Pracownik>) {
      console.log(event)
      const selected = event.detail;
      console.log(event.detail)
      console.log(selected)
  
      if (selectedUser && selectedUser.imie === selected.imie && selectedUser.nazwisko === selected.nazwisko && selectedUser._id === selected._id) {
        showLogs.set(false); // Collapse the logs section
        selectedUser = null;
        logowania = [];
        return;
      }
      selectedUser = selected;
      $showLogs = true; // Expand the logs section
    }
  </script>
  
  <div class="flex w-full h-screen">
    <div class="w-64 overflow-scroll h-screen">
      {#each data.pracownicy as user}
        <Uzytkownik 
          imie={user.imie} 
          nazwisko={user.nazwisko} 
          stanowisko={user.stanowisko}
          _id={user._id} 
          on:select={handleSelect}
          selected={selectedUser && selectedUser.imie === user.imie && selectedUser.nazwisko === user.nazwisko && selectedUser._id === user._id} 
        />
      {/each}
    </div>
    
    <div class="flex-grow items-center justify-center bg-gray-100">
      <h1 class="text-center mb-4 text-5xl font-bold p-6">Panel administratora</h1>
    {#if selectedUser}
    <div transition:slide={{ duration: 300 }} class="flex flex-col items-center justify-center">
      <KontoZmiany selectedUser={selectedUser}/>
      <button class="px-4 py-2 bg-red-500 text-white rounded my-2" on:click={() => (showModal = true)}>Usuń Użytkownika</button>
      <Modal bind:showModal>
        <h1>Czy na pewno chcesz usunąć użytkownika?</h1>
        <form action="?/Delete" method="post" use:enhance={({formData}) => {
          formData.append("imie", selectedUser.imie)
          formData.append("nazwisko", selectedUser.nazwisko)
        }}>
          <button type="submit" class="px-4 py-2 bg-red-500 text-white rounded my-2">Tak</button>
        </form>
      </Modal>
    </div>
    {/if}
    </div>
    {#if error}
    <div class="text-red-500">
      {error}
    </div>
    {/if}
  </div>
  
  
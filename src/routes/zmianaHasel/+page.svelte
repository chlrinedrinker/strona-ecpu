<script lang="ts">
  import Uzytkownik from "../komponenty/Uzytkownik.svelte";
  import KontoZmiany from "../komponenty/KontoZmiany.svelte";
  import { writable } from "svelte/store";
  import { slide } from "svelte/transition";
  import type { PageData } from "../$types";
  import { enhance } from "$app/forms";
  import Modal from "../komponenty/Modal.svelte";
  export let data: PageData;

  interface Pracownik {
    _id: string;
    imie: string;
    nazwisko: string;
    stanowisko: string;
  }

  let showModal = false;
  let logowania: {
    date: string;
    entrence_time: string;
    exit_time: string;
    hours: number;
  }[] = [];

  let selectedUser: Pracownik | null = null;
  let error: string | null = null;

  const showLogs = writable(false);
  const showUserList = writable(true); // Nowy store kontrolujący widoczność listy użytkowników

  async function handleSelect(event: CustomEvent<Pracownik>) {
    const selected = event.detail;

    if (
      selectedUser &&
      selectedUser.imie === selected.imie &&
      selectedUser.nazwisko === selected.nazwisko &&
      selectedUser._id === selected._id
    ) {
      showLogs.set(false);
      selectedUser = null;
      logowania = [];
      showUserList.set(true); // Pokaż listę użytkowników
      return;
    }
    selectedUser = selected;
    showLogs.set(true);
    showUserList.set(false); // Ukryj listę użytkowników
  }

  function handleBack() {
    selectedUser = null;
    showLogs.set(false);
    showUserList.set(true); // Pokaż listę użytkowników
  }
</script>

<div class="flex w-full h-screen flex-col md:flex-row">
  <div
    class={`w-64 overflow-y-visible overflow-scroll h-screen lg:block ${$showUserList ? "block" : "hidden"} lg:visible bg-white`}
  >
    {#each data.pracownicy as user}
      <Uzytkownik
        imie={user.imie}
        nazwisko={user.nazwisko}
        stanowisko={user.stanowisko}
        on:select={handleSelect}
        selected={selectedUser &&
          selectedUser.imie === user.imie &&
          selectedUser.nazwisko === user.nazwisko}
      />
    {/each}
  </div>

  {#if selectedUser}
    <!-- Przycisk powrotu -->
    <button
      on:click={handleBack}
      class="lg:hidden fixed top-48 -left-5 bg-gray-300 text-gray-800 p-2 rounded shadow-md text-xs m-1"
    >
      <div class="flex items-center justify-center w-5 h-7 bg-gray-300 rounded">
        <span class="text-lg">&gt;</span>
      </div>
    </button>
  {/if}

  <div
    class="w-full md:flex-grow md:items-center md:justify-center bg-gray-100 p-4 md:p-6"
  >
    <!-- Nagłówek widoczny na dużych ekranach i po wybraniu użytkownika na małych ekranach -->
    <h1 class={`text-center mb-4 text-2xl md:text-5xl font-bold ${!selectedUser && 'hidden md:block'}`}>
      Panel administratora
    </h1>
    {#if selectedUser}
      <div
        transition:slide={{ duration: 300 }}
        class="flex flex-col items-center justify-center"
      >
        <KontoZmiany {selectedUser} />
      </div>
    {/if}
  </div>

  {#if error}
    <div class="text-red-500">{error}</div>
  {/if}
</div>

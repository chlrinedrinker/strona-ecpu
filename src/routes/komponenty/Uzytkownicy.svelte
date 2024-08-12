<script lang="ts">
  import Uzytkownik from "./Uzytkownik.svelte";
  import ShowLogs from "./ShowLogs.svelte";
  import { writable } from "svelte/store";
  import { slide } from "svelte/transition";
  import NavbarKalendarz from "./NavbarKalendarz.svelte";
  export let pracownicy;
  export let aktywniPracownicy: Pracownik[];

  interface Pracownik {
    _id: string;
    imie: string;
    nazwisko: string;
    stanowisko: string;
    active: string;
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
  const isLoading = writable(false); // Loading state
  const showUserList = writable(true); // Show/hide user list for small screens

  async function fetchLogsForUser(user: Pracownik) {
    try {
      const response = await fetch(
        `/endpoints/CzasPracy?imie=${encodeURIComponent(user.imie)}&nazwisko=${encodeURIComponent(user.nazwisko)}`
      );
      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `Failed to fetch logs: ${response.status} ${response.statusText} - ${errorText}`
        );
        error = "Nie udało się załadować logów";
        return [];
      }
      return await response.json();
    } catch (err) {
      console.error("Błąd podczas ładowania logów:", err);
      error = "Błąd podczas ładowania logów";
      return [];
    }
  }

  function isUserActive(user: Pracownik) {
    return aktywniPracownicy.some((use) => {
      return use["_id"] == user["_id"];
    });
  }

  async function handleSelect(event: CustomEvent<Pracownik>) {
    const selected = event.detail;

    if (
      selectedUser &&
      selectedUser.imie === selected.imie &&
      selectedUser.nazwisko === selected.nazwisko
    ) {
      showLogs.set(false);
      selectedUser = null;
      showUserList.set(true);
      return;
    }

    selectedUser = selected;
    showLogs.set(true);
    showUserList.set(false);

    if (selectedUser) {
      const userLogs = await fetchLogsForUser(selectedUser);
      logowaniaStore.update((logs) => {
        logs[selectedUser!._id] = userLogs;
        return logs;
      });
    }
  }

  function handleBack() {
    selectedUser = null;
    showLogs.set(false);
    showUserList.set(true);
  }
</script>

<!-- Przepisałem style na klasy Tailwind CSS -->
<div
  class={`w-64 overflow-y-visible overflow-scroll h-screen lg:block ${$showUserList ? "block" : "hidden"} lg:visible`}
>
  {#if $isLoading}
    <div>Loading...</div>
  {:else}
    {#each pracownicy as user}
      <Uzytkownik
        imie={user.imie}
        nazwisko={user.nazwisko}
        stanowisko={user.stanowisko}
        on:select={handleSelect}
        selected={selectedUser &&
          selectedUser.imie === user.imie &&
          selectedUser.nazwisko === user.nazwisko}
        active={isUserActive(user)}
      />
    {/each}
  {/if}
</div>

{#if selectedUser}
  <div class="relative lg:flex lg:w-full lg:h-screen">
    <!-- Przycisk powrotu -->
    <button
      on:click={handleBack}
      class="lg:hidden fixed top-48 -left-5 bg-gray-300 text-gray-800 p-2 rounded shadow-md text-xs m-1"
    >
      <div class="flex items-center justify-center w-5 h-7 bg-gray-300 rounded">
        <span class="text-lg">&gt;</span>
      </div>
    </button>

    <!-- Sekcja ShowLogs na dużych ekranach -->
    <div
      class="lg:w-3/4 lg:flex lg:flex-col lg:overflow-auto lg:transition-transform lg:duration-200 lg:mb-0 overflow-hidden mb-10 z-90"
    >
      <ShowLogs logowania={$logowaniaStore[selectedUser._id]} {selectedUser} />
    </div>

    <!-- NavbarKalendarz na dużych ekranach -->
    <div
      class="lg:w-1/4 lg:flex lg:flex-col lg:justify-between lg:bg-white lg:overflow-auto lg:border-r lg:border-gray-200 max-w-full overflow-hidden z-90"
    >
      <NavbarKalendarz logowania={$logowaniaStore[selectedUser._id]} />
    </div>
  </div>
{/if}

{#if error}
  <div class="text-red-500">{error}</div>
{/if}

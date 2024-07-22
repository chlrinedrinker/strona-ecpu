<script lang="ts">
  import { onMount } from 'svelte';

  let currentTime = '';
  let username = '';
  let password = '';
  function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    currentTime = `${hours}:${minutes}:${seconds}`;
  }

  onMount(() => {
    getCurrentTime();
    const interval = setInterval(getCurrentTime, 1000);
    return () => {
      clearInterval(interval);
    };
  });

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

  let pracownicy: Pracownik[] = [];
  let logowania: Logowanie[] = [];
  let error: string | null = null;
  let selectedUser: Pracownik | null = null;

  onMount(async () => {
    console.log('Pobieranie pracowników...');
    try {
      const response = await fetch('/pracownicy');
      if (response.ok) {
        pracownicy = await response.json();
        console.log('Pracownicy:', pracownicy);
      } else {
        error = 'Nie udało się załadować pracowników';
        console.error(error);
      }
    } catch (err) {
      error = 'Błąd podczas ładowania pracowników';
      console.error(error, err);
    }
  });

  async function selectUser(user: Pracownik) {
  selectedUser = user;
  console.log(user._id)
  const collectionName = `${user.imie}_${user.nazwisko}`;
  console.log(collectionName)
  try {
    const response = await fetch(`/czas_pracy/${collectionName}`);
    console.log('Response status:', response.status);
    if (response.ok) {
      logowania = await response.json();
      console.log('Logowania:', logowania); // Debugging line
      error = null;
    } else {
      error = 'Nie udało się załadować logowań';
      console.error('Error status:', response.status);
    }
  } catch (err) {
    error = 'Błąd podczas ładowania logowań';
    console.error('Fetch error:', err);
  }
}
</script>

<div class="flex flex-grow">
  <!-- Sidebar -->
  <div class="w-64 p-4 border-r">
    <h2 class="mb-4 text-lg font-semibold">Zakres dat</h2>
    <div class="space-y-2">
      <ul>
        <li><button class="btn">Dzisiaj</button></li>
        <li><button class="btn">Tydzień</button></li>
        <li><button class="btn">Miesiąc</button></li>
        <li><button class="btn">Niestandardowy</button></li>
      </ul>
    </div>
  </div>

  <!-- Main Content -->
  <div class="flex-grow p-4">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-semibold">Kalendarz Maj 2022</h1>
      <div class="space-x-2">
        <button class="btn">Publikuj</button>
        <button class="btn">Akcje grupowe</button>
        <button class="btn">Kreator</button>
      </div>
    </div>
    <div class="flex space-x-4">
      <!-- Users List -->
      <div class="w-64">
        {#each pracownicy as user}
          <button type="button" class="flex items-center w-full p-2 space-x-2 border-b cursor-pointer text-left" on:click={() => selectUser(user)}>
            <img src="/user.png" alt="person" class="w-10 h-10 rounded-full bg-gray-300">
            <div>
              <div class="text-sm font-semibold">{user.imie} {user.nazwisko}</div>
              <div class="text-xs text-gray-500">{user.stanowisko}</div>
            </div>
          </button>
        {/each}
      </div>
      <!-- Schedule -->
      <div class="flex-grow">
        {#if selectedUser}
          <h2 class="text-lg font-semibold">Logowania</h2>
          <table class="w-full mt-4 border">
            <thead>
              <tr>
                <th class="px-4 py-2 border">Data</th>
                <th class="px-4 py-2 border">Początek pracy</th>
                <th class="px-4 py-2 border">Koniec pracy</th>
                <th class="px-4 py-2 border">Suma godzin</th>
              </tr>
            </thead>
            <tbody>
              {#each logowania as log}
                <tr>
                  <td class="px-4 py-2 border">{log.date}</td>
                  <td class="px-4 py-2 border">{log.entrence_time}</td>
                  <td class="px-4 py-2 border">{log.exit_time}</td>
                  <td class="px-4 py-2 border">{log.hours}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        {/if}
      </div>
    </div>
  </div>

  <!-- Right Sidebar -->
  <div class="w-64 p-4 border-l">
    {#if selectedUser}
      <h2 class="text-lg font-semibold">Biuro</h2>
      <div>
        <div class="mb-4">
          <h3 class="text-sm font-semibold">{selectedUser.imie} {selectedUser.nazwisko}</h3>
          <div class="text-xs text-gray-500">{selectedUser.stanowisko}</div>
        </div>
        <div class="mb-4">
          <h4 class="text-sm font-semibold">Grafiki pracy</h4>
          <div class="text-sm">7-15 Pierwsza zmiana</div>
        </div>
        <div>
          <h4 class="text-sm font-semibold">Wnioski</h4>
          <div class="text-sm"></div>
        </div>
      </div>
    {:else}
      <h2 class="text-lg font-semibold">CZW, 5 maj</h2>
      <div>
        <div class="mb-4">
          <h3 class="text-sm font-semibold">05 Piąty Użytkownik</h3>
          <div class="text-xs text-gray-500">Pracownik</div>
        </div>
        <div class="mb-4">
          <h4 class="text-sm font-semibold">Grafiki pracy</h4>
          <div class="text-sm">6:00 - 14:00 Pierwsza zmiana</div>
        </div>
        <div>
          <h4 class="text-sm font-semibold">Wnioski</h4>
          <div class="text-sm">2022/29 ZAAKCEPTOWANY</div>
        </div>
      </div>
    {/if}
  </div>
</div>

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

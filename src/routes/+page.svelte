<script lang="ts">
  import { onMount } from 'svelte';

  let currentTime = '';

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

  interface User {
    name: string;
    role: string;
    tag: string;
    hours: string;
    schedule: string;
  }

  let users: User[] = [
    { name: 'Jan Kowalski', role: 'Kierownik', tag: 'Biuro', hours: '9:00-17:00', schedule: 'Biuro' },
    { name: 'Aneta Przybyła', role: 'Menadżer', tag: 'Biuro', hours: '9:00-17:00', schedule: 'Biuro' },
    { name: 'Janusz Palikot', role: 'Szef', tag: 'Biuro', hours: '9:00-17:00', schedule: 'Biuro' },
    { name: 'Włodzmierz Biały', role: 'Pracownik', tag: 'Biuro', hours: '9:00-17:00', schedule: 'Biuro' },
    { name: 'Jeremiasz Różowy-Człowiek', role: 'Pracownik', tag: 'Biuro', hours: '9:00-17:00', schedule: 'Biuro' },
    { name: 'Anna Kozieł', role: 'Pracownik', tag: 'Biuro', hours: '9:00-17:00', schedule: 'Biuro' },
  ];

  let selectedUser: User | null = null;

  function selectUser(user: User) {
    selectedUser = user;
  }
</script>

<div class="flex flex-grow">
  <!-- Sidebar -->
  <div class="w-64 p-4 border-r">
    <h2 class="mb-4 text-lg font-semibold">Zakres dat</h2>
    <div class="space-y-2">
      <button class="btn">Dzisiaj</button>
      <button class="btn">Tydzień</button>
      <button class="btn">Miesiąc</button>
      <button class="btn">Okres rozl.</button>
      <button class="btn">Niestandardowy</button>
    </div>
    <h2 class="mt-8 mb-4 text-lg font-semibold">Grafiki pracy</h2>
    <div class="space-y-2">
      <button class="btn">Wszystkie</button>
      <button class="btn">Grafik normowany</button>
      <button class="btn">Grafik nienormowany</button>
      <button class="btn">Grafik nadgodzinowy</button>
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
        {#each users as user}
          <button type="button" class="flex items-center w-full p-2 space-x-2 border-b cursor-pointer text-left" on:click={() => selectUser(user)}>
            <img src="/user.png" alt="person" class="w-10 h-10 rounded-full bg-gray-300">
            <div>
              <div class="text-sm font-semibold">{user.name}</div>
              <div class="text-xs text-gray-500">{user.role}</div>
            </div>
          </button>
        {/each}
      </div>
      <!-- Schedule -->
      <div class="flex-grow">
        <!-- Render schedule based on the user's data -->
      </div>
    </div>
  </div>

  <!-- Right Sidebar -->
  <div class="w-64 p-4 border-l">
    {#if selectedUser}
      <h2 class="text-lg font-semibold">{selectedUser.tag}</h2>
      <div>
        <div class="mb-4">
          <h3 class="text-sm font-semibold">{selectedUser.name}</h3>
          <div class="text-xs text-gray-500">{selectedUser.role}</div>
        </div>
        <div class="mb-4">
          <h4 class="text-sm font-semibold">Grafiki pracy</h4>
          <div class="text-sm">{selectedUser.hours} {selectedUser.schedule}</div>
        </div>
        <div>
          <h4 class="text-sm font-semibold">Wnioski</h4>
          <div class="text-sm">2022/29 ZAAKCEPTOWANY</div>
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


<style>
  .btn {
    @apply px-4 py-2 bg-blue-500 text-white rounded;
  }
  .cursor-pointer {
    cursor: pointer;
  }
</style>

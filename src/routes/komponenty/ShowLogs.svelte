<script lang="ts">
  import { onMount, tick } from 'svelte';
  import flatpickr from "flatpickr";
  import "flatpickr/dist/flatpickr.css";
  import { enhance } from '$app/forms';
  import { writable } from 'svelte/store';
  

  export let logowania: { _id: string; date: string; entrence_time: string; exit_time: string; hours: string; comment?: string, historia_komentarza?: string }[] = [];
  export let selectedUser: { imie: string; nazwisko: string; stanowisko: string };
  let filteredLogowania = [];
  let customStartDate = "";
  let customEndDate = "";
  let showFiltered = false;
  let totalHours = 0;

  const showModal = writable(false);
  const modalContent = writable("");
  const modalDate = writable("");
  const modalHistory = writable("");
  const currentLog = writable({ _id: "", date: "", entrence_time: "", exit_time: "", hours: "", comment: "", historia_komentarza: "" });

  const parseHours = (time: string): number => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours + minutes / 60;
  };

  const convertDecimalHoursToTime = (decimalHours: number): string => {
      const hours = Math.floor(decimalHours);
      const minutes = Math.round((decimalHours - hours) * 60);
      return ${hours}:${minutes.toString().padStart(2, '0')};
  };

  const filterLogs = async (range: string) => {
      showFiltered = true;
      hideCustomDateRange();
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
      } else if (range === "custom") {
          startDate = new Date(customStartDate);
          endDate = new Date(customEndDate);
      } else {
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      }

      filteredLogowania = logowania.filter(log => {
          const logDate = new Date(log.date);
          return logDate >= startDate && logDate <= endDate;
      });

      totalHours = filteredLogowania.reduce((sum, log) => sum + parseHours(log.hours), 0);

      await tick();
  };

  const setupDatePickers = () => {
      flatpickr("#customStartDate", {
          onChange: (selectedDates) => {
              customStartDate = selectedDates[0].toISOString();
          }
      });
      flatpickr("#customEndDate", {
          onChange: (selectedDates) => {
              customEndDate = selectedDates[0].toISOString();
          }
      });
  };

  const showCustomDateRange = () => {
      document.getElementById('customDateRange').style.display = 'block';
  };

  const hideCustomDateRange = () => {
      document.getElementById('customDateRange').style.display = 'none';
  };

  const openModal = (log) => {
      currentLog.set(log);
      modalContent.set(log.comment || "Brak komentarza");
      modalDate.set(log.date);
      modalHistory.set(log.historia_komentarza || "Brak historii komentarzy");
      showModal.set(true);
  };

  const closeModal = () => {
      showModal.set(false);
  };

  const parseHistory = (history) => {
      return history.split('\n').filter(line => line).map(line => {
          const [date, time, ...commentParts] = line.split(' ');
          return { date, time, comment: commentParts.join(' ') };
      });
  };

  onMount(() => {
      setupDatePickers();
  });

  const applyCustomDateFilter = () => {
      filterLogs("custom");
  };

  $: {
      if (logowania.length > 0 && !showFiltered) {
          filteredLogowania = [...logowania];
          totalHours = filteredLogowania.reduce((sum, log) => sum + parseHours(log.hours), 0);
      }
  }
</script>


<div class="p-4">
  <div class="mb-4">
      <div class="mb-4">
      <h2 class="mb-4 text-lg font-semibold">Wybierz zakres dat aby wyświetlić logowania</h2>
      <ul class="flex space-x-2 justify-center">
          <li><button class="px-4 py-2 bg-blue-500 text-white rounded" on:click={() => filterLogs("today")}>Dzisiaj</button></li>
          <li><button class="px-4 py-2 bg-blue-500 text-white rounded" on:click={() => filterLogs("week")}>Tydzień</button></li>
          <li><button class="px-4 py-2 bg-blue-500 text-white rounded" on:click={() => filterLogs("month")}>Miesiąc</button></li>
          <li><button class="px-4 py-2 bg-blue-500 text-white rounded" on:click={() => showCustomDateRange()}>Niestandardowy</button></li>
      </ul>
      <p class="text-center font-bold mt-4">Suma godzin: {convertDecimalHoursToTime(totalHours)}</p>
  </div>
  
  <div id="customDateRange" style="display: none;" class="mt-4">
    <label for="customStartDate">Początek:</label>
    <input id="customStartDate" type="text" class="w-full px-4 py-2 border rounded mb-2 mr-2 flex-1" />
    <label for="customEndDate">Koniec:</label>
    <input id="customEndDate" type="text" class="w-full px-4 py-2 border rounded mb-2 mr-2 flex-1" />
    <button class="px-4 py-2 bg-blue-500 text-white rounded" on:click={() => applyCustomDateFilter()}>Zastosuj</button>
  </div>

  <h2>Logowania użytkownika: <span class="underline decoration-2 decoration-sky-600">{selectedUser.imie} {selectedUser.nazwisko}</span></h2>
  <table class="border-collapse w-full mt-4 text-center">
    <thead>
      <tr>
        <th>Data</th>
        <th>Godzina wejścia</th>
        <th>Godzina wyjścia</th>
        <th>Godziny</th>
        <th>Komentarz</th>
      </tr>
    </thead>
    <tbody>
      {#if showFiltered}
        {#each filteredLogowania as log}
          <tr>
            <td>{log.date}</td>
            <td>{log.entrence_time}</td>
            <td>{log.exit_time}</td>
            <td>{log.hours}</td>
            <td>
              <div class="comment-container">
                <button class="px-4 py-2 bg-blue-500 text-white rounded ml-2" on:click={() => openModal(log)}>Zobacz komentarz</button>
            </div>
            </td>
          </tr>
        {/each}
      {:else}
        {#each logowania as log}
        <tr>
          <td>{log.date}</td>
          <td>{log.entrence_time}</td>
          <td>{log.exit_time}</td>
          <td>{log.hours}</td>
          <td>
              <div class="flex justify-center items-center flex-col">
                  <button class="px-4 py-2 bg-blue-500 text-white rounded ml-2" on:click={() => openModal(log)}>Zobacz komentarz</button>
              </div>
          </td>
      </tr>
        {/each}
      {/if}
    </tbody>
  </table>
  
  {#if $showModal}
    <div class="flex justify-center items-center fixed inset-0 z-10 overflow-auto bg-black/40">
        <div class="bg-white my-20 mx-auto p-5 border border-gray-400 w-72 rounded-lg">
            <span class="text-gray-400 float-right text-2xl font-bold hover:text-black hover:no-underline focus:text-black focus:no-underline cursor-pointer" on:click={closeModal}>&times;</span>
            <h2 class="mt-0"><strong>Komentarz</strong></h2>
            <form action="?/saveComment" method="post" use:enhance={({formData}) => {
                formData.append("imie", selectedUser.imie);
                formData.append("nazwisko", selectedUser.nazwisko);
                formData.append("data", $currentLog.date);
                formData.append("wejscie", $currentLog.entrence_time);
            }}>
                <input type="text" class="w-full px-4 py-2 border rounded" placeholder="Dodaj komentarz" name="komentarz" bind:value={$currentLog.comment} />
                <button class="px-4 py-2 bg-blue-500 text-white rounded ml-2" type="submit">Zapisz</button>
            </form>
            <h3><strong>Historia komentarzy:</strong></h3>
            {#if $modalHistory}
                <table class="w-full border-collapse mt-4 text-center">
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Czas</th>
                            <th>Komentarz</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each parseHistory($modalHistory) as entry}
                            <tr>
                                <td>{entry.date}</td>
                                <td>{entry.time}</td>
                                <td>{entry.comment}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            {:else}
                <p class="my-2 mx-0">Brak historii komentarzy</p>
            {/if}
        </div>
    </div>
  {/if}
  </div>
</div>

<style>
  th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: center;
  }
  th {
      background-color: #f4f4f4;
  }
</style>
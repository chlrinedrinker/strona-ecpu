<script lang="ts">
  import { onMount, tick } from 'svelte';
  import flatpickr from "flatpickr";
  import "flatpickr/dist/flatpickr.css";
  import tippy from 'tippy.js';
  import 'tippy.js/dist/tippy.css'; // Import Tippy.js CSS
  import { enhance } from '$app/forms';
  import { writable } from 'svelte/store';
  import { isLoggedIn, userType } from "../stores/stores";
  import { generatePDF } from './pdfUtils.js';

  
  export let logowania: { _id: string; date: string; entrence_time: string; exit_time: string; hours: string; komentarz?: string, historia_komentarza?: string }[] = [];
  export let selectedUser: { imie: string; nazwisko: string; stanowisko: string };

  // Tablica miesięcy
  const months = [
        { value: '0', name: 'Styczeń' },
        { value: '1', name: 'Luty' },
        { value: '2', name: 'Marzec' },
        { value: '3', name: 'Kwiecień' },
        { value: '4', name: 'Maj' },
        { value: '5', name: 'Czerwiec' },
        { value: '6', name: 'Lipiec' },
        { value: '7', name: 'Sierpień' },
        { value: '8', name: 'Wrzesień' },
        { value: '9', name: 'Październik' },
        { value: '10', name: 'Listopad' },
        { value: '11', name: 'Grudzień' }
    ];

  // Wybrany miesiąc
  export let selectedMonth: string = '1'; // Domyślnie Styczeń
  let filteredLogowania = [];
  let customStartDate = "";
  let customEndDate = "";
  let showFiltered = false;
  let totalHours = 0;

    const showModal = writable(false);
    const showReportModal = writable(false);
    const modalContent = writable("");
    const modalDate = writable("");
    const modalHistory = writable("");
    const currentLog = writable({ _id: "", date: "", entrence_time: "", exit_time: "", hours: "", komentarz: "", historia_komentarza: "" });
    const editField = writable("");
    const newValue = writable("");

    const parseHours = (time: string): number => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours + minutes / 60;
    };

    const convertDecimalHoursToTime = (decimalHours: number): string => {
        const hours = Math.floor(decimalHours);
        const minutes = Math.round((decimalHours - hours) * 60);
        return `${hours}:${minutes.toString().padStart(2, '0')}`;
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
        setupTooltips();
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
      modalContent.set(log.komentarz || "Brak komentarza");
      modalDate.set(log.date);
      modalHistory.set(log.historia_komentarza || "Brak historii komentarzy");
      showModal.set(true);
    };
    
    const closeModal = () => {
        showModal.set(false);
    };
    
    const openReportModal = () => {
      modalContent.set("Raport");
      showReportModal.set(true);
    };

    const closeReportModal = () => {
        showReportModal.set(false);
    };

    const parseHistory = (history) => {
        return history.split('\n').filter(line => line).map(line => {
            const [date, time, ...commentParts] = line.split(' ');
            return { date, time, comment: commentParts.join(' ') };
        });
    };

    const setupTooltips = () => {
      const commentButtons = document.querySelectorAll('.comment-button');
      commentButtons.forEach(button => {
        tippy(button, {
          content: button.getAttribute('data-comment') || "Brak komentarza",
          placement: 'top',
          theme: 'light',
          maxWidth: 200,
        });
      });
    };

    

    

    onMount(() => {
        setupDatePickers();
        setupTooltips();
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
        <h2 class="mb-4 text-lg font-semibold">Wybierz zakres dat aby wyświetlić logowania</h2>
        <ul class="flex space-x-2 justify-center">
            <li><button class="px-4 py-2 bg-blue-500 text-white rounded" on:click={() => filterLogs("today")}>Dzisiaj</button></li>
            <li><button class="px-4 py-2 bg-blue-500 text-white rounded" on:click={() => filterLogs("week")}>Tydzień</button></li>
            <li><button class="px-4 py-2 bg-blue-500 text-white rounded" on:click={() => filterLogs("month")}>Miesiąc</button></li>
            <li><button class="px-4 py-2 bg-blue-500 text-white rounded" on:click={() => showCustomDateRange()}>Niestandardowy</button></li>
        </ul>
      <div class="flex space-x-2 justify-center">
        <button class="px-4 py-2 mt-2 bg-blue-500 text-white rounded" on:click={openReportModal}>Wygeneruj raport</button>
      </div>
        <p class="font-bold text-center mt-4">Suma godzin: {convertDecimalHoursToTime(totalHours)}</p>
    </div>

    <div id="customDateRange" style="display: none;" class="mt-4">
      <label for="customStartDate">Początek:</label>
      <input id="customStartDate" type="text" class="w-full px-4 py-2 border rounded mb-2 mr-2 flex-1" />
      <label for="customEndDate">Koniec:</label>
      <input id="customEndDate" type="text" class="w-full px-4 py-2 border rounded mb-2 mr-2 flex-1" />
      <button class="px-4 py-2 bg-blue-500 text-white rounded" on:click={() => applyCustomDateFilter()}>Zastosuj</button>
    </div>

    <h2>Logowania użytkownika: <span class="underline decoration-2 decoration-sky-600">{selectedUser.imie} {selectedUser.nazwisko}</span></h2>
    <table class="wd-100 border-collapse mt-4">
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
                <div class="flex justify-center items-center">
                  <button class="px-4 py-2 bg-blue-500 text-white rounded comment-button ml-2" data-comment={log.komentarz || "Brak komentarza"} on:click={() => openModal(log)}>Zobacz komentarz</button>
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
                <div class="flex justify-center items-center">
                    <button class="px-4 py-2 bg-blue-500 text-white rounded comment-button ml-2" data-comment={log.komentarz || "Brak komentarza"} on:click={() => openModal(log)}>Zobacz komentarz</button>
                </div>
            </td>
          </tr>
          {/each}
        {/if}
      </tbody>
    </table>

    {#if $showModal}
    <div class="flex justify-center items-center fixed inset-0 z-10 overflow-auto bg-black/40">
        <div class="bg-white my-20 mx-auto p-5 border border-gray-400 w-full max-w-4xl rounded-lg">
            <button on:click={closeModal}><span class="text-gray-400 float-right text-2xl font-bold hover:text-black hover:no-underline focus:text-black focus:no-underline cursor-pointer">&times;</span></button>
            <div class="flex mt-4 space-x-4">
                <div class="w-1/2">
                        <h2 class="mt-0"><strong>Komentarz</strong></h2>
                <form action="?/saveComment" method="post" use:enhance={({ formData }) => {
                    formData.append("imie", selectedUser.imie);
                    formData.append("nazwisko", selectedUser.nazwisko);
                    formData.append("data", $currentLog.date);
                    formData.append("wejscie", $currentLog.entrence_time);
                }}>
                    <input type="text" class="w-full px-4 py-2 border rounded mr-2 flex-1 mb-4" placeholder="Dodaj komentarz" name="komentarz" bind:value={$currentLog.comment} />
                    <button class="w-full px-4 py-2 bg-blue-500 text-white rounded" type="submit">Zapisz</button>
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
                        <p class="mx-2 my-0">Brak historii komentarzy</p>
                    {/if}
                </div>
                {#if $userType == 0}
                <div class="w-1/2">
                    <h4><strong>Edycja godzin:</strong></h4>
                    <div class="mb-4">
                        <p class="mx-2 my-0">Godzina wejścia</p>

                            <form action="?/editEntrenceHours" method="post" use:enhance={({ formData }) => {
                                formData.append("imie", selectedUser.imie);
                                formData.append("nazwisko", selectedUser.nazwisko);
                                formData.append("data", $currentLog.date);
                                formData.append("wyjscie", $currentLog.exit_time);
                            }}>
                                <input type="text" class="w-full px-4 py-2 border rounded mr-2 flex-1 mb-2" placeholder="Edytuj godzinę" name="entrance_time" bind:value={$currentLog.entrence_time} />
                                <button class="w-full px-4 py-2 bg-blue-500 text-white rounded" type="submit">Zapisz</button>
                            </form>

                    </div>
                    <div class="mb-4">
                        <p class="mx-2 my-0">Godzina wyjścia</p>
                        <form action="?/editExitHours" method="post" use:enhance={({ formData }) => {
                            formData.append("imie", selectedUser.imie);
                            formData.append("nazwisko", selectedUser.nazwisko);
                            formData.append("data", $currentLog.date);
                            formData.append("wejscie", $currentLog.entrence_time);
                        }}>
                            <input type="text" class="w-full px-4 py-2 border rounded mr-2 flex-1 mb-2" placeholder="Edytuj godzinę" name="exit_time" bind:value={$currentLog.exit_time} />
                            <button class="w-full px-4 py-2 bg-blue-500 text-white rounded" type="submit">Zapisz</button>
                        </form>
                    </div>
                    <div>
                        <p class="mx-2 my-0">Suma godzin</p>
                        <form action="?/editHours" method="post" use:enhance={({ formData }) => {
                            formData.append("imie", selectedUser.imie);
                            formData.append("nazwisko", selectedUser.nazwisko);
                            formData.append("data", $currentLog.date);
                            formData.append("wejscie", $currentLog.entrence_time);
                        }}>
                            <input type="text" class="w-full px-4 py-2 border rounded mr-2 flex-1 mb-2" placeholder="Edytuj godziny" name="hours" bind:value={$currentLog.hours} />
                            <button class="w-full px-4 py-2 bg-blue-500 text-white rounded" type="submit">Zapisz</button>
                        </form>
                    </div>
                </div>
                {/if}
            </div>
        </div>
    </div>
{/if}
  {#if $showReportModal}
    <div class="flex justify-center items-center fixed inset-0 z-10 overflow-auto bg-black/40">
        <div class="bg-white my-20 mx-auto p-5 border border-gray-400 w-72 rounded-lg">
            <button on:click={closeReportModal}><span class="text-gray-400 float-right text-2xl font-bold hover:text-black hover:no-underline focus:text-black focus:no-underline cursor-pointer">&times;</span></button>
            <h2 class="mt-0"><strong>Pobierz Raport użytkownika&nbsp; </strong>{selectedUser.imie} {selectedUser.nazwisko}</h2>
            <div class="mt-2">
              <label for="months">Wybierz Miesiąc</label><br>
              <select bind:value={selectedMonth}>
                {#each months as { value, name }}
                    <option value={value}>{name}</option>
                {/each}
            </select><br>
              <button class="px-4 py-2 mt-4 bg-blue-500 text-white rounded" on:click={() => generatePDF(selectedUser, logowania, 2024, Number(selectedMonth))}>Pobierz Raport</button>
            </div>
        </div>
    </div>
  {/if}
</div>

<style>
    th, td {
        @apply border border-gray-300 p-2 text-center;
    }
    th {
        @apply bg-gray-200;
    }
</style>



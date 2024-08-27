<script lang="ts">
  import { onMount, tick } from "svelte";
  import flatpickr from "flatpickr";
  import "flatpickr/dist/flatpickr.css";
  import tippy from "tippy.js";
  import "tippy.js/dist/tippy.css"; // Import Tippy.js CSS
  import { enhance } from "$app/forms";
  import { writable } from "svelte/store";
  import { totalHours,showFiltered, exportDate , userType } from "../stores/stores";
  import { generatePDF } from "./pdfUtils";
  import { t } from '../../i18n.js'; // Importing the i18n functions
  import type { ActionData } from './$types';
    import { page } from "$app/stores";
  
  export let form: ActionData;

  
  export let logowania: {
    _id: string;
    date: string;
    entrence_time: string;
    exit_time: string;
    hours: string;
    type: string;
    komentarz?: string;
    historia_komentarza?: string;
  }[] = [];
  export let selectedUser: {
    imie: string;
    nazwisko: string;
    stanowisko: string;
  };

  // Tablica miesięcy
  const months = [
    { "value": "0", "name": t('january') },
    { "value": "1", "name": t('february') },
    { "value": "2", "name": t('march') },
    { "value": "3", "name": t('april') },
    { "value": "4", "name": t('may') },
    { "value": "5", "name": t('june') },
    { "value": "6", "name": t('july') },
    { "value": "7", "name": t('august') },
    { "value": "8", "name": t('september') },
    { "value": "9", "name": t('october') },
    { "value": "10", "name": t('november') },
    { "value": "11", "name": t('december') },
  ];

  let isActive = (log) => {
    if(log.komentarz == null && log.type == "w"){
      console.log(log.komentarz == null)
      console.log(log.type == "w")
      console.log(log.komentarz == null && log.type == "w")
      return true;}
    else {
      return false;
    }
  }
    

  // Wybrany miesiąc
  export let selectedMonth: string = "1"; // Domyślnie Styczeń
  let filteredLogowania = [];
  let customStartDate = "";
  let customEndDate = "";
  
  const showModal = writable(false);
  const showReportModal = writable(false);
  const modalContent = writable("");
  const modalDate = writable("");
  const modalHistory = writable("");
  const currentLog = writable({
    _id: "",
    date: "",
    entrence_time: "",
    exit_time: "",
    hours: "",
    komentarz: "",
    type: "",
    historia_komentarza: "",
  });
  const editField = writable("");
  const newValue = writable("");

  const parseHours = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours + minutes / 60;
  };

  const convertDecimalHoursToTime = (decimalHours: number): string => {
    const hours = Math.floor(decimalHours);
    const minutes = Math.round((decimalHours - hours) * 60);
    return `${hours}:${minutes.toString().padStart(2, "0")}`;
  };

  const filterLogs = async (range: string) => {
    // Reset eksportu i pokaż filtrowane wyniki
    exportDate.set(null);
    $showFiltered = true;
    hideCustomDateRange();

    const now = new Date(); // Obecna data
    let startDate: Date;
    let endDate: Date = new Date(now);

    // Ustalanie zakresów na podstawie wybranego filtru
    if (range === "today") {
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    } else if (range === "week") {
        const startOfWeek = new Date(now);
        const dayOfWeek = startOfWeek.getDay() || 7; // Poniedziałek jako początek tygodnia
        startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek + 1);
        startDate = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate());
    } else if (range === "month") {
        startDate = new Date(now.getFullYear(), now.getMonth(), 1); // Początek miesiąca
    } else if (range === "custom") {
        startDate = new Date(document.getElementById("customStartDate").value);
        endDate = new Date(document.getElementById("customEndDate").value);
    } else {
        startDate = new Date(now.getFullYear(), now.getMonth(), 1); // Domyślnie początek miesiąca
    }

    // Filtrowanie logów na podstawie zakresu dat
    filteredLogowania = logowania.filter((log) => {
        const logDate = new Date(log.date);
        return logDate >= startDate && logDate <= endDate;
    });

    // Obliczenie całkowitej liczby godzin
    $totalHours = filteredLogowania.reduce(
        (sum, log) => sum + parseHours(log.hours),
        0
    );

    // Zaktualizowanie UI
    await tick();
    setupTooltips();
};

  // Nowa funkcja do filtrowania logów na podstawie `exportDate`
  const filterLogsByExportDate = async (selectedDate: string) => {
    const startDate = new Date(selectedDate);
    const endDate = new Date(selectedDate);
    $showFiltered = true;
    // Filtrowanie logów na podstawie wybranej daty
    filteredLogowania = logowania.filter((log) => {
      const logDate = new Date(log.date);
      return logDate >= startDate && logDate <= endDate;
    });

    // Obliczenie sumy godzin
    $totalHours = filteredLogowania.reduce(
      (sum, log) => sum + parseHours(log.hours),
      0
    );

    // Aktualizacja widoku
    await tick();
    setupTooltips();
  };

  // Reaktywna deklaracja, która wywołuje `filterLogsByExportDate` za każdym razem, gdy `exportDate` się zmienia
  $: {
    if ($exportDate !== null) {
      filterLogsByExportDate($exportDate);
    }
  }
  // function extractLastPart(text: string): string {
  //   // Usuń białe znaki na początku i końcu ciągu
  //   const trimmedText = text.trim();

  //   // Sprawdź, czy tekst ma co najmniej 18 znaków
  //   if (trimmedText.length > 18) {
  //       // Zwróć wszystko po 18. znaku
  //       return trimmedText.substring(18);
  //   } else {
  //       // Jeśli tekst ma mniej niż 18 znaków, zwróć pusty ciąg
  //       return "";
  //   }
  // }
  // const setupDatePickers = () => {
  //   flatpickr("#customStartDate", {
  //     onChange: (selectedDates) => {
  //       customStartDate = selectedDates[0].toISOString();
  //     },
  //   });
  //   flatpickr("#customEndDate", {
  //     onChange: (selectedDates) => {
  //       customEndDate = selectedDates[0].toISOString();
  //     },
  //   });
  // };

  const showCustomDateRange = () => {
    document.getElementById("customDateRange").style.display = "block";
  };

  const hideCustomDateRange = () => {
    document.getElementById("customDateRange").style.display = "none";
  };

  const openModal = (log) => {
    currentLog.set(log);
    modalContent.set(log.komentarz || t('no_comment'));
    modalDate.set(log.date);
    modalHistory.set(log.historia_komentarza ||  t('no_comment_history'));
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
    return history
      .split("\n")
      .filter((line) => line)
      .map((line) => {
        const [date, time, ...commentParts] = line.split(" ");
        return { date, time, comment: commentParts.join(" ") };
      });
  };

  const setupTooltips = () => {
    const commentButtons = document.querySelectorAll(".comment-button");
    commentButtons.forEach((button) => {
      tippy(button, {
        content: button.getAttribute("data-comment") || t('no_comment'),
        placement: "top",
        theme: "light",
        maxWidth: 200,
      });
    });
  };

  // Zmienna dla nowego modala
  const showAddLogModal = writable(false);

  const openAddLogModal = () => {
    showAddLogModal.set(true);
  };

  const closeAddLogModal = () => {
    showAddLogModal.set(false);
  };

  onMount(() => {
    // setupDatePickers();
    setupTooltips();
    showFiltered.set(false);
  });
  $: {
    $showFiltered; // Reakcja na zmiany w store
  }
  const applyCustomDateFilter = () => {
    filterLogs("custom");
  };

  $: {
    if (logowania.length > 0 && !showFiltered) {
      filteredLogowania = [...logowania];
      $totalHours = filteredLogowania.reduce(
        (sum, log) => sum + parseHours(log.hours),
        0
      );
    }
  }
  function handleOutsideClick(event) {
    // Check if the clicked element is outside the dropdown content
    if (event.target.closest('.dropdown-content') === null) {
        closeModal();
    }
    if (event.target.closest('.dropdown-raport-content') === null) {
        closeReportModal();
    }
    if (event.target.closest('.dropdown-add-content') === null) {
        closeAddLogModal();
    }
  }
  
</script>

<div class="p-1 md:p-2 z-90">
  <div class="mb-2">
    <h2 class="mb-2 text-xs md:text-base font-semibold text-center">
      {t('select_date_range')}
    </h2>
    <ul class="flex flex-wrap space-x-1 justify-center">
      <li>
        <button
          class="px-1 py-1 md:px-2 md:py-1 bg-blue-500 text-white rounded text-xs md:text-sm"
          on:click={() => filterLogs("today")}>{t('today')}</button
        >
      </li>
      <li>
        <button
          class="px-1 py-1 md:px-2 md:py-1 bg-blue-500 text-white rounded text-xs md:text-sm"
          on:click={() => filterLogs("week")}>{t('week')}</button
        >
      </li>
      <li>
        <button
          class="px-1 py-1 md:px-2 md:py-1 bg-blue-500 text-white rounded text-xs md:text-sm"
          on:click={() => filterLogs("month")}>{t('month')}</button
        >
      </li>
      <li>
        <button
          class="px-1 py-1 md:px-2 md:py-1 bg-blue-500 text-white rounded text-xs md:text-sm"
          on:click={() => showCustomDateRange()}>{t('custom')}</button
        >
      </li>
    </ul>
    {#if $userType == 0}
    <div class="flex space-x-1 justify-center mt-2">
      <button
        class="px-1 py-1 md:px-2 md:py-1 bg-blue-500 text-white rounded text-xs md:text-sm"
        on:click={openReportModal}>{t('generate_report')}</button
      >
      <button
        class="px-1 py-1 md:px-2 md:py-1 bg-blue-500 text-white rounded text-xs md:text-sm"
        on:click={openAddLogModal}>{t('add_log')}</button
      >
    </div>
    {/if}
    <p class="font-bold text-center mt-2 text-xs md:text-sm">
      {t('total_hours')}: {convertDecimalHoursToTime($totalHours)}
    </p>
  </div>
  

  <div id="customDateRange" style="display: none;" class="mt-2">
    <label for="customStartDate" class="block text-xs">{t('start')}:</label>
    <input
        id="customStartDate"
        type="date" 
        class="w-full px-1 py-1 border rounded mb-1 text-xs"
    />
    <label for="customEndDate" class="block text-xs">{t('end')}:</label>
    <input
        id="customEndDate"
        type="date" 
        class="w-full px-1 py-1 border rounded mb-1 text-xs"
    />
    <button
        class="px-1 py-1 md:px-2 md:py-1 bg-blue-500 text-white rounded text-xs md:text-sm"
        on:click={() => filterLogs('custom')}>{t('apply')}</button>
</div>

  <h2 class="text-center text-xs md:text-sm">
    {t('user_logins')}: <span
      class="underline decoration-2 decoration-sky-600"
      >{selectedUser.imie} {selectedUser.nazwisko}</span
    >
  </h2>
  <div class="overflow-x-auto">
    <table class="w-full border-collapse mt-2 text-xs md:text-sm">
      <thead>
        <tr>
          <th class="p-2 md:p-3">{t('date')}</th>
          <th class="p-2 md:p-3">{t('entrance_time')}</th>
          <th class="p-2 md:p-3">{t('exit_time')}</th>
          <th class="p-2 md:p-3 hidden md:table-cell">{t('hours')}</th>
          <th class="p-2 md:p-3 hidden md:table-cell">{t('comment')}</th>
          <th class="p-2 md:p-3">{t('edit')}</th>
        </tr>
      </thead>
      <tbody>
        {#if $showFiltered}
          {#each filteredLogowania as log}
            <tr class:bg-red-600={isActive(log)} class:text-neutral-50={isActive(log)}>
              <td class="p-2 md:p-3">{log.date}</td>
              <td class="p-2 md:p-3">{log.entrence_time}</td>
              <td class="p-2 md:p-3">
                {#if log.exit_time === 'Obecny'}
                  {t('active')}
                {:else if log.exit_time === 'Brak drugiego odbicia'}
                  {t('no_second')}
                {:else}
                  {log.exit_time}
                {/if}
              </td>
              <td class="p-2 md:p-3 hidden md:table-cell">{log.hours}</td>
              <td class="p-2 md:p-3 hidden md:table-cell">{log.komentarz || t('no_comment')}</td>
              <td class="p-2 md:p-3">
                <div class="flex justify-center items-center">
                  <button class="px-8 py-1 bg-blue-500 text-white rounded comment-button text-xs" data-comment={log.komentarz || t('no_comment')} on:click={() => openModal(log)}>
                    {t('edit')}
                  </button>
                </div>
              </td>
            </tr>
          {/each}
        {:else}
          {#each logowania as log}
            <tr class:bg-red-600={isActive(log)} class:text-neutral-50={isActive(log)}>
              <td>{log.date}</td>
              <td>{log.entrence_time}</td>
              <td class="p-2 md:p-3">
                {#if log.exit_time === 'Obecny'}
                  {t('active')}
                {:else if log.exit_time === 'Brak drugiego odbicia'}
                  {t('no_second')}
                {:else}
                  {log.exit_time}
                {/if}
              </td>
              <td
                class="p-2 md:p-3 hidden md:table-cell"
              >{log.hours}</td>
              <td
                class="p-2 md:p-3 hidden md:table-cell"
                >{log.komentarz ||
                  t('no_comment')}</td
              >
              <td class="p-2 md:p-3">
                <div class="flex justify-center items-center">
                  <button
                    class="px-8 py-1 bg-blue-500 text-white rounded comment-button ml-1 text-xs"
                    data-comment={log.komentarz ||  t('no_comment')}
                    on:click={() => openModal(log)}>{t('edit')}</button
                  >
                </div>
              </td>
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
  </div>

  <!-- Modal z komentarzem -->
  {#if $showModal}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="flex justify-center items-center fixed inset-0 z-10 overflow-auto bg-black/40" on:click={handleOutsideClick}
  >
    <div
      class="bg-white my-2 mx-4 p-4 border border-gray-400 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-4xl rounded-lg dropdown-content"
    >
      <button on:click={closeModal}>
        <span
          class="text-gray-400 float-right text-xl font-bold hover:text-black hover:no-underline focus:text-black focus:no-underline cursor-pointer"
          >&times;</span
        >
      </button>
      <div
        class="flex flex-col md:flex-row mt-2 space-y-2 md:space-y-0 md:space-x-2"
      >
        <div class="w-full md:w-1/2">
          <h2 class="text-xs md:text-base"><strong>{t('comment')}</strong></h2>
          <form
            action="?/saveComment"
            method="post"
            use:enhance={({ formData }) => {
              formData.append("imie", selectedUser.imie);
              formData.append("nazwisko", selectedUser.nazwisko);
              formData.append("data", $currentLog.date);
              formData.append("wejscie", $currentLog.entrence_time);
            }}
          >
            <input
              type="text"
              class="w-full px-2 py-1 border rounded mb-2 text-xs md:text-sm"
              placeholder={t('add_comment')} 
              name="komentarz"
              bind:value={$currentLog.komentarz}
            />
            <button
              class="w-full px-2 py-1 bg-blue-500 text-white rounded text-xs md:text-sm"
              type="submit">{t('save')}</button
            >
          </form>
          <h3 class="text-xs md:text-base">
            <strong>{t('comment_history')} </strong>
          </h3>
          {#if $modalHistory}
            <table class="w-full border-collapse mt-2 text-center text-xs md:text-sm">
              <thead>
                <tr>
                  <th>{t('date')}</th>
                  <th>{t('entrance_time')}</th>
                  <th>{t('comment')}</th>
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
            <p class="mx-1 my-0 text-xs">{t('no_comment_history')}</p>
          {/if}
        </div>
        {#if $currentLog.type == "w" && $currentLog.komentarz == null}
          {#if form?.success}
            <p class=text-green-200>Przerwa została opisana</p>
          {/if}
        <form
        action="?/selectTypeOfBreak"
        method="post"
        use:enhance={({ formData }) => {
          formData.append("imie", selectedUser.imie);
          formData.append("nazwisko", selectedUser.nazwisko);
          formData.append("data", $currentLog.date);
          formData.append("wejscie", $currentLog.entrence_time);
          formData.append("wyjscie", $currentLog.exit_time);
        }}
      > 
        <select
        name="typ"
        id="typ"
        class="w-full p-2 border border-gray-300 rounded"
          > 
          <option value="0">Wyjscie Prywatne</option>
          <option value="1">Wyjscie Służbowe</option>
        </select>
        <button
          class="w-full px-2 py-1 bg-blue-500 text-white rounded text-xs md:text-sm"
          type="submit">{t('save')}</button>
      </form>
      {/if}

        {#if $userType == 0}
          <div class="w-full md:w-1/2">
            <h4 class="text-xs md:text-base">
              <strong>{t('edit')}:</strong>
            </h4>
            <div class="mb-2">
              <form
                action="?/editEntrenceHours"
                method="post"
                use:enhance={({ formData }) => {
                  formData.append("imie", selectedUser.imie);
                  formData.append("nazwisko", selectedUser.nazwisko);
                  formData.append("data", $currentLog.date);
                  formData.append("wejscie1", $currentLog.entrence_time);
                  formData.append("wyjscie", $currentLog.exit_time);
                }}
              >
                <input
                  class="w-full px-2 py-1 border rounded mb-2 text-xs md:text-sm"
                  type="time"
                  placeholder={t('entrance_time')} 
                  
                  name="entrance_time"
                />
                <button
                  class="w-full px-2 py-1 bg-blue-500 text-white rounded text-xs md:text-sm"
                  type="submit">{t('save')}</button
                >
              </form>
              <hr>
              <form
                action="?/editExitHours"
                method="post"
                use:enhance={({ formData }) => {
                  formData.append("imie", selectedUser.imie);
                  formData.append("nazwisko", selectedUser.nazwisko);
                  formData.append("data", $currentLog.date);
                  formData.append("wejscie", $currentLog.entrence_time);
                }}
              >
                <input
                  class="w-full px-2 py-1 border rounded mb-2 text-xs md:text-sm"
                  type="time"
                  placeholder={t('exit_time')} 
                  
                  name="exit_time"
                />
                <button
                  class="w-full px-2 py-1 bg-blue-500 text-white rounded text-xs md:text-sm"
                  type="submit">{t('save')}</button>
              </form>
              {#if form?.success}
                <p class="text-green-200">Pomyślnie usnięto log</p>
              {/if}
              <form
                  action="?/deleteLog"
                  method="post"
                  use:enhance={({ formData }) => {
                    formData.append("imie", selectedUser.imie);
                    formData.append("nazwisko", selectedUser.nazwisko);
                    formData.append("data", $currentLog.date);
                    formData.append("wejscie", $currentLog.entrence_time);
                  }}
                  onsubmit="return confirm('Czy na pewno chcesz usunąć ten log?');"
                >
                  <button
                    class="w-full px-2 py-1 bg-red-500 text-white rounded text-xs md:text-sm"
                    type="submit"
                  >
                    {t('delete_log')}
                  </button>
                </form>

            </div> 
          </div>
        {/if}
      </div>
    </div>
  </div>
  {/if}
</div>


{#if $showReportModal}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="flex justify-center items-center fixed inset-0 z-10 overflow-auto bg-black/40" on:click={handleOutsideClick}
  >
    <div
      class="bg-white my-5 mx-2 p-5 border border-gray-400 w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg dropdown-raport-content"
    >
      <button on:click={closeReportModal}>
        <span
          class="text-gray-400 float-right text-2xl font-bold hover:text-black hover:no-underline focus:text-black focus:no-underline cursor-pointer"
          >&times;</span
        >
      </button>
      <h2 class="mt-0 text-xl md:text-2xl font-bold">
        <strong>{t('get_user_report')}&nbsp; </strong>
        {selectedUser.imie}
        {selectedUser.nazwisko}
      </h2>
      <div class="mt-4">
        <label for="months" class="block mb-2">{t('select_month')}</label>
        <select
          bind:value={selectedMonth}
          class="w-full px-4 py-2 border rounded mb-4"
        >
          {#each months as { value, name }}
            <option {value}>{name}</option>
          {/each}
        </select>
        <button
          class="w-full px-4 py-2 bg-blue-500 text-white rounded"
          on:click={() =>
            generatePDF(selectedUser, logowania, 2024, Number(selectedMonth))}
          >{t('get_user_report')}</button
        >
      </div>
    </div>
  </div>
{/if}

{#if $showAddLogModal}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="flex justify-center items-center fixed inset-0 z-10 overflow-auto bg-black/40" on:click={handleOutsideClick}
  >
    <div
      class="bg-white my-5 mx-2 p-5 border border-gray-400 w-full max-w-xs md:max-w-sm lg:max-w-4xl rounded-lg dropdown-add-content"
    >
      <button on:click={closeAddLogModal}>
        <span
          class="text-gray-400 float-right text-2xl font-bold hover:text-black hover:no-underline focus:text-black focus:no-underline cursor-pointer"
          >&times;</span
        >
      </button>
      <h2 class="mt-0 py-5 text-center text-xl md:text-2xl font-bold">
        <strong>{t('add_new_log')}</strong>
      </h2>
      <form
        action="?/addLog"
        method="post"
        use:enhance={({ formData }) => {
          formData.append("imie", selectedUser.imie);
          formData.append("nazwisko", selectedUser.nazwisko);
        }}
      >
        <div class="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
          <div>
            <label for="date">{t('date')}</label>
            <input
              type="date"
              class="w-full px-4 py-2 border rounded"
              name="date"
              required
            />
          </div>
          <div>
            <label for="entrance_time">{t('entrance_time')}</label>
            <input
              type="time"
              class="w-full px-4 py-2 border rounded"
              name="entrance_time"
              required
            />
          </div>
          <div>
            <label for="exit_time">{t('exit_time')}</label>
            <input
              type="time"
              class="w-full px-4 py-2 border rounded"
              name="exit_time"
              required
            />
          </div>
          <div>
            <label for="hours">{t('hours')}</label>
            <input
              type="number"
              step="0.1"
              class="w-full px-4 py-2 border rounded"
              name="hours"
              required
            />
          </div>
        </div>
        <div class="mb-4">
          <label for="komentarz">{t('comment')}</label>
          <textarea class="w-full px-4 py-2 border rounded" name="komentarz"
            >{t('manual_log_added')}</textarea
          >
        </div>
        <button
          class="w-full px-4 py-2 bg-blue-500 text-white rounded"
          type="submit">{t('add_new_log')}</button
        >
      </form>
    </div>
  </div>
{/if}

<style>
  th,
  td {
    @apply border border-gray-300 p-2 text-center;
  }
  th {
    @apply bg-gray-200;
  }
</style>

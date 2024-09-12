<script lang="ts">
  import { onMount, tick } from "svelte";
  import flatpickr from "flatpickr";
  import "flatpickr/dist/flatpickr.css";
  import tippy from "tippy.js";
  import "tippy.js/dist/tippy.css"; // Import Tippy.js CSS
  import { enhance } from "$app/forms";
  import { writable } from "svelte/store";
  import { totalHours,showFiltered, exportDate , userType} from "../stores/stores";
  import { generatePDF } from "./pdfUtils";
  import { t } from '../../i18n.js'; // Importing the i18n functions
  import type { ActionData } from './$types';
    import { page } from "$app/stores";
  import NavbarKalendarz from "./NavbarKalendarz.svelte";
  
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
  let rok = new Date().getFullYear()

  // Wybrany miesiąc
  export let selectedMonth: string = "1"; // Domyślnie Styczeń
  let filteredLogowania  = [];
  
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
    (sum, log) => {
        // Sprawdzamy, czy log.hours istnieje i nie jest NaN, zanim dodamy do sumy
        if (log.hours && !isNaN(parseHours(log.hours))) {
            return sum + parseHours(log.hours);
        }
        return sum;
    },
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
    (sum, log) => {
        // Sprawdzamy, czy log.hours istnieje i nie jest NaN, zanim dodamy do sumy
        if (log.hours && !isNaN(parseHours(log.hours))) {
            return sum + parseHours(log.hours);
        }
        return sum;
    },
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

  const showCustomDateRange = () => {
    document.getElementById("customDateRange")!.style.display = "block";
  };

  const hideCustomDateRange = () => {
    document.getElementById("customDateRange")!.style.display = "none";
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
    rok = new Date().getFullYear()
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

<div class="p-1 md:p-2 z-90" >    
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
    <div class="flex space-x-1 justify-center mt-2">
    <button
      class="px-1 py-1 md:px-2 md:py-1 bg-blue-500 text-white rounded text-xs md:text-sm"
      on:click={openReportModal}>{t('generate_report')}</button
    >
    {#if $userType != 2}
      <button
        class="px-1 py-1 md:px-2 md:py-1 bg-blue-500 text-white rounded text-xs md:text-sm"
        on:click={openAddLogModal}>{t('add_log')}</button
      >
      {/if}
    </div>
    {#if $showFiltered}
    <p class="font-bold text-center mt-2 text-xs md:text-sm">
      {t('total_hours')}: {convertDecimalHoursToTime($totalHours)}
    </p>
    {/if}
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
  <div
    class="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-40"
    on:click={handleOutsideClick}
  >
    <div
      class="relative w-full max-w-4xl p-6 bg-white rounded-lg mx-4 my-6"
      on:click|stopPropagation
    >
      <button
        class="absolute top-4 right-4 text-2xl text-gray-400 hover:text-black focus:outline-none"
        on:click={closeModal}
      >
        &times;
      </button>

      <!-- Flex container for aligning the headers -->
      <div class="flex flex-col md:flex-row gap-6 mt-8">
        <!-- Comment Section -->
        <div class="w-full md:w-1/2">
          <div class="flex items-center mb-4">
            <h2 class="text-lg font-semibold">{t('comment')}</h2>
          </div>
          <form
            action="?/saveComment"
            method="post"
            use:enhance={({ formData }) => {
              formData.append("imie", selectedUser.imie);
              formData.append("nazwisko", selectedUser.nazwisko);
              formData.append("data", $currentLog.date);
              formData.append("wejscie", $currentLog.entrence_time);
            }}
            class="space-y-4"
          >
            <input
              type="text"
              name="komentarz"
              bind:value={$currentLog.komentarz}
              placeholder={t('add_comment')}
              class="w-full px-4 py-2 border rounded-lg text-sm"
            />
            <button
              type="submit"
              class="w-full px-4 py-2 text-white bg-blue-500 rounded-lg text-sm hover:bg-blue-600"
            >
              {t('save')}
            </button>
          </form>

          <h3 class="mt-8 mb-4 text-lg font-semibold">{t('comment_history')}</h3>
          {#if $modalHistory}
            <div class="overflow-auto max-h-64">
              <table class="w-full text-sm text-center border-collapse">
                <thead class="bg-gray-100">
                  <tr>
                    <th class="px-4 py-2 border">{t('date')}</th>
                    <th class="px-4 py-2 border">{t('entrance_time')}</th>
                    <th class="px-4 py-2 border">{t('comment')}</th>
                  </tr>
                </thead>
                <tbody>
                  {#each parseHistory($modalHistory) as entry}
                    <tr>
                      <td class="px-4 py-2 border">{entry.date}</td>
                      <td class="px-4 py-2 border">{entry.time}</td>
                      <td class="px-4 py-2 border">{entry.comment}</td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          {:else}
            <p class="text-sm text-gray-500">{t('no_comment_history')}</p>
          {/if}
        </div>

        <!-- Break Type Selection -->
        {#if $currentLog.type == "w" && $currentLog.komentarz == null}
          <div class="w-full md:w-1/2">
            <div class="flex items-center mb-4">
              <h2 class="text-lg font-semibold">{t('select_break_type')}</h2>
            </div>
            {#if form?.success}
              <p class="mb-4 text-sm text-green-500">{t('break_described_successfully')}</p>
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
              class="space-y-4"
            >
              <select
                name="typ"
                id="typ"
                class="w-full px-4 py-2 border rounded-lg text-sm"
              >
                <option value="0">{t('private_exit')}</option>
                <option value="1">{t('business_exit')}</option>
              </select>
              <button
                type="submit"
                class="w-full px-4 py-2 text-white bg-blue-500 rounded-lg text-sm hover:bg-blue-600"
              >
                {t('save')}
              </button>
            </form>
          </div>
        {/if}

        <!-- Edit Section -->
        {#if $userType != 2}
          <div class="w-full md:w-1/2">
            <div class="flex items-center mb-4">
              <h2 class="text-lg font-semibold">{t('edit')}</h2>
            </div>
            <div class="space-y-6">
              <!-- Edit Entrance Time -->
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
                class="space-y-4"
              >
                <input
                  type="time"
                  name="entrance_time"
                  class="w-full px-4 py-2 border rounded-lg text-sm"
                />
                <button
                  type="submit"
                  class="w-full px-4 py-2 text-white bg-blue-500 rounded-lg text-sm hover:bg-blue-600"
                >
                  {t('save')}
                </button>
              </form>

              <!-- Edit Exit Time -->
              <form
                action="?/editExitHours"
                method="post"
                use:enhance={({ formData }) => {
                  formData.append("imie", selectedUser.imie);
                  formData.append("nazwisko", selectedUser.nazwisko);
                  formData.append("data", $currentLog.date);
                  formData.append("wejscie", $currentLog.entrence_time);
                }}
                class="space-y-4"
              >
                <input
                  type="time"
                  name="exit_time"
                  class="w-full px-4 py-2 border rounded-lg text-sm"
                />
                <button
                  type="submit"
                  class="w-full px-4 py-2 text-white bg-blue-500 rounded-lg text-sm hover:bg-blue-600"
                >
                  {t('save')}
                </button>
              </form>

              <!-- Delete Log -->
              {#if form?.success}
                <p class="text-sm text-green-500">{t('log_deleted_successfully')}</p>
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
                on:submit|preventDefault={() => {
                  if (confirm(t('confirm_delete_log'))) {
                    this.submit();
                  }
                }}
              >
                <button
                  type="submit"
                  class="w-full px-4 py-2 text-white bg-red-500 rounded-lg text-sm hover:bg-red-600"
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
            generatePDF(selectedUser, logowania, rok, Number(selectedMonth))}
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

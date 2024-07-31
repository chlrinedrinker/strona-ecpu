<script lang="ts">
  import { onMount, tick } from 'svelte';
  import flatpickr from "flatpickr";
  import "flatpickr/dist/flatpickr.css";
  import { enhance } from '$app/forms';
    import { writable } from 'svelte/store';

  export let logowania: { _id: string; date: string; entrence_time: string; exit_time: string; hours: string; comment?: string }[] = [];
  export let selectedUser: { imie: string; nazwisko: string; stanowisko: string };
  let filteredLogowania = [];
  let totalHours;
  let customStartDate = "";
  let customEndDate = "";
  let showFiltered = false; // Track whether to show filtered logs

  // Funkcja konwertująca czas w formacie hh:mm na godziny w postaci dziesiętnej
  const parseHours = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours + minutes / 60;
  };
  // Funkcja konwertująca godziny w postaci dziesiętnej na format hh:mm
  const convertDecimalHoursToTime = (decimalHours: number): string => {
    const hours = Math.floor(decimalHours);
    const minutes = Math.round((decimalHours - hours) * 60);
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  };

  const showCustomDateRange = () => {
    document.getElementById('customDateRange').style.display = 'block';
  };

  const hideCustomDateRange = () => {
    document.getElementById('customDateRange').style.display = 'none';
  };

  const filterLogs = async (range: string) => {
    console.log("Filtering logs with range:", range); // Debugging log
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

    // Filtruj logi
    filteredLogowania = logowania.filter(log => {
      const logDate = new Date(log.date);
      return logDate >= startDate && logDate <= endDate;
    });

    // Obliczanie sumy godzin
    totalHours = filteredLogowania.reduce((sum, log) => sum + parseHours(log.hours), 0);
    console.log("Total hours:", totalHours); // Debugging log
    console.log("Filtered logs:", filteredLogowania); // Debugging log


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

  onMount(() => {
    setupDatePickers();
  });

  const applyCustomDateFilter = () => {
    filterLogs("custom");
  };
  };

</script>

<div class="p-4">
  <div class="date-filters mb-4">
    <h2 class="mb-4 text-lg font-semibold">Wybierz zakres dat aby wyświetlić logowania</h2>
    <ul class="flex space-x-2">
      <li><button class="btn" on:click={() =>  filterLogs("today")}>Dzisiaj</button></li>
      <li><button class="btn" on:click={() => filterLogs("week")}>Tydzień</button></li>
      <li><button class="btn" on:click={() => filterLogs("month")}>Miesiąc</button></li>
      <li><button class="btn" on:click={() => showCustomDateRange()}>Niestandardowy</button></li>
    </ul>

  </div>
  
  <div id="customDateRange" style="display: none;" class="mt-4">
    <label for="customStartDate">Początek:</label>
    <input id="customStartDate" type="text" class="input mb-2" />
    <label for="customEndDate">Koniec:</label>
    <input id="customEndDate" type="text" class="input mb-2" />
    <button class="btn" on:click={() => applyCustomDateFilter()}>Zastosuj</button>
  </div>

  <h2>Logowania użytkownika: <span class="underline decoration-2 decoration-sky-600">{selectedUser.imie} {selectedUser.nazwisko}</span></h2>
  <table>
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
              <form class="comment-container" 
              action="?/saveComment" 
              method="post"
              use:enhance={({formData}) => {
                formData.append("imie", selectedUser.imie)
                formData.append("nazwisko", selectedUser.nazwisko)
                formData.append("data", log.date)
                formData.append("wejscie", log.entrence_time)
              }}>
                <input type="text" class="input" placeholder="Dodaj komentarz" name="komentarz" value={form}/>
                <button class="btn ml-2" type="submit">Zapisz</button>
              </form>
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
              <form class="comment-container" 
              action="?/saveComment" 
              method="post" 
              use:enhance={({formData}) => {
                formData.append("imie", selectedUser.imie)
                formData.append("nazwisko", selectedUser.nazwisko)
                formData.append("data", log.date)
                formData.append("wejscie", log.entrence_time)
              }}>
                <input type="text" class="input" placeholder="Dodaj komentarz" name="komentarz"/>
                <button class="btn ml-2" type="submit">Zapisz</button>
              </form>
            </td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</div>

<style>
  .btn {
    @apply px-4 py-2 bg-blue-500 text-white rounded;
  }
  .input {
    @apply w-full px-4 py-2 border rounded;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  th {
    background-color: #f4f4f4;
  }
  .ml-2 {
    margin-left: 0.5rem;
  }
  .comment-container {
    display: flex;
    align-items: center;
  }
  .input {
    margin-right: 0.5rem;
    flex: 1;
  }
  .date-filters {
    margin-bottom: 1rem;
  }
  .total-hours {
    font-weight: bold;
  }
</style>

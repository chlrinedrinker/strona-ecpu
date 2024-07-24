<script lang="ts">
  import flatpickr from "flatpickr";
  import "flatpickr/dist/flatpickr.css";
  import { onMount } from "svelte";

  export let logowania: { date: string; entrence_time: string; exit_time: string; hours: number }[];

  let filteredLogowania = logowania;
  let customStartDate = "";
  let customEndDate = "";

  const filterLogs = (range: string) => {
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
    }

    filteredLogowania = logowania.filter(log => {
      const logDate = new Date(log.date);
      return logDate >= startDate && logDate <= endDate;
    });
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

  onMount(() => {
    setupDatePickers();
  });

  const applyCustomDateFilter = () => {
    filterLogs("custom");
  };

  const saveComment = async (log) => {
    // dodaj komentarze do bazy
  };
</script>

<div class="p-4">
  <div class="date-filters mb-4">
    <h2 class="mb-4 text-lg font-semibold">Wybierz zakres dat aby wyświetlić logowania</h2>
    <ul class="flex space-x-2">
      <li><button class="btn" on:click={() => filterLogs("today")}>Dzisiaj</button></li>
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
    <button class="btn" on:click={applyCustomDateFilter}>Zastosuj</button>
  </div>

  <h2>Logowania</h2>
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
      {#each filteredLogowania as log}
        <tr>
          <td>{log.date}</td>
          <td>{log.entrence_time}</td>
          <td>{log.exit_time}</td>
          <td>{log.hours}</td>
          <td>
            <div class="comment-container">
              <input type="text" class="input" bind:value={log.comment} placeholder="Dodaj komentarz" />
              <button class="btn ml-2" on:click={() => saveComment(log)}>Zapisz</button>
            </div>
          </td>
        </tr>
      {/each}
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
</style>

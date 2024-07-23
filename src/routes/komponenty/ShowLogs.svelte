<script lang="ts">
  import flatpickr from "flatpickr";
  import "flatpickr/dist/flatpickr.css";
  import { onMount } from "svelte";

  export let logowania: { date: string; entrence_time: string; exit_time: string; hours: number }[];

  // Function to eliminate duplicates from logowania
  const removeDuplicates = (logs) => {
    const uniqueLogs = new Map();
    logs.forEach(log => {
      const key = `${log.date}-${log.entrence_time}-${log.exit_time}`;
      if (!uniqueLogs.has(key)) {
        uniqueLogs.set(key, log);
      }
    });
    return Array.from(uniqueLogs.values());
  };

  logowania = removeDuplicates(logowania);

  let filteredLogowania = logowania;
  let customStartDate = "";
  let customEndDate = "";
  let isDateRangeApplied = false; // Flag to track date range application

  const filterLogs = (range: string) => {
    const now = new Date();
    let startDate: Date;
    let endDate: Date = now;

    if (range === "today") {
      startDate = new Date(now.setHours(0, 0, 0, 0));
      isDateRangeApplied = true;
    } else if (range === "week") {
      const startOfWeek = now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1);
      startDate = new Date(now.setDate(startOfWeek));
      isDateRangeApplied = true;
    } else if (range === "month") {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      isDateRangeApplied = true;
    } else if (range === "custom") {
      startDate = new Date(customStartDate);
      endDate = new Date(customEndDate);
      isDateRangeApplied = true;
    } else {
      // Default case to show all logs
      filteredLogowania = logowania;
      isDateRangeApplied = false;
      return;
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

  onMount(() => {
    setupDatePickers();
    // Show all logs by default on mount
    filterLogs(""); 
  });

  const applyCustomDateFilter = () => {
    filterLogs("custom");
  };

  // Function to show all logs if no date range is applied
  const showAllLogsIfNoDateRange = () => {
    if (!isDateRangeApplied) {
      filteredLogowania = logowania;
    }
  };
</script>

<div class="fixed left-0 w-64 p-4 border-r h-full">
  <h2 class="mb-4 text-lg font-semibold">Zakres dat</h2>
  <div>
    <ul class="space-y-2">
      <li><button class="btn" on:click={() => filterLogs("today")}>Dzisiaj</button></li>
      <li><button class="btn" on:click={() => filterLogs("week")}>Tydzień</button></li>
      <li><button class="btn" on:click={() => filterLogs("month")}>Miesiąc</button></li>
      <li><button class="btn" on:click={() => document.getElementById('customDateRange').style.display = 'block'}>Niestandardowy</button></li>
    </ul>
  </div>
  
  <div id="customDateRange" style="display: none;" class="mt-4">
    <label for="customStartDate">Początek:</label>
    <input id="customStartDate" type="text" class="input" />
    <label for="customEndDate">Koniec:</label>
    <input id="customEndDate" type="text" class="input" />
    <button class="btn mt-2" on:click={applyCustomDateFilter}>Zastosuj</button>
  </div>
</div>

<div class="ml-64 p-4">
  <h2>Logowania</h2>
  <table>
    <thead>
      <tr>
        <th>Data</th>
        <th>Godzina wejścia</th>
        <th>Godzina wyjścia</th>
        <th>Godziny</th>
      </tr>
    </thead>
    <tbody>
      {#each filteredLogowania as log}
        <tr>
          <td>{log.date}</td>
          <td>{log.entrence_time}</td>
          <td>{log.exit_time}</td>
          <td>{log.hours}</td>
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
</style>

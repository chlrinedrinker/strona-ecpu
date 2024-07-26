<script lang="ts">
  import { onMount } from 'svelte';
  import flatpickr from "flatpickr";
  import "flatpickr/dist/flatpickr.css";

  // Exported properties for logs and selected user
  export let logowania: { date: string; entrence_time: string; exit_time: string; hours: number }[] = [];
  export let selectedUser: { imie: string; nazwisko: string; stanowisko: string };

  let filteredLogowania = logowania; // Filtered logs
  let customStartDate = ""; // Custom start date
  let customEndDate = ""; // Custom end date

  // Function to filter logs based on the selected range
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
    } else {
      // Default filter to current month
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    // Filter logs based on the start and end date
    filteredLogowania = logowania.filter(log => {
      const logDate = new Date(log.date);
      return logDate >= startDate && logDate <= endDate;
    });
  };

  // Function to setup date pickers
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

  // Function to show custom date range inputs
  const showCustomDateRange = () => {
    document.getElementById('customDateRange').style.display = 'block';
  };

  // Function to hide custom date range inputs
  const hideCustomDateRange = () => {
    document.getElementById('customDateRange').style.display = 'none';
  };

  // Setup date pickers and default filter to current month on mount
  onMount(() => {
    setupDatePickers();
    filterLogs("month");
  });

  // Apply custom date filter
  const applyCustomDateFilter = () => {
    filterLogs("custom");
  };

  // Function to save comment for a log
  const saveComment = async (log) => {
    try {
      const response = await fetch('/endpoints/SaveComment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: selectedUser,
          date: log.date,
          comment: log.comment,
          logId: log._id
        }),
      });

      if (response.ok) {
        console.log('Comment saved');
      } else {
        console.error('Failed to save comment');
      }
    } catch (error) {
      console.error('Error saving comment:', error);
    }
  };
</script>

<div class="p-4">
  <div class="date-filters mb-4">
    <h2 class="mb-4 text-lg font-semibold">Select a date range to view logs</h2>
    <ul class="flex space-x-2">
      <li><button class="btn" on:click={() => filterLogs("today")}>Today</button></li>
      <li><button class="btn" on:click={() => filterLogs("week")}>Week</button></li>
      <li><button class="btn" on:click={() => filterLogs("month")}>Month</button></li>
      <li><button class="btn" on:click={() => showCustomDateRange()}>Custom</button></li>
    </ul>
  </div>

  <!-- Custom date range inputs, initially hidden -->
  <div id="customDateRange" style="display: none;" class="mt-4">
    <label for="customStartDate">Start:</label>
    <input id="customStartDate" type="text" class="input mb-2" />
    <label for="customEndDate">End:</label>
    <input id="customEndDate" type="text" class="input mb-2" />
    <button class="btn" on:click={applyCustomDateFilter}>Apply</button>
  </div>

  <h2>Logowania użytkownika: <span class="underline decoration-2 decoration-sky-600">{selectedUser.imie} {selectedUser.nazwisko}</span></h2>
  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Entrance Time</th>
        <th>Exit Time</th>
        <th>Hours</th>
        <th>Comment</th>
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
              <input type="text" class="input" bind:value={log.comment} placeholder="Add comment" />
              <button class="btn ml-2" on:click={() => saveComment(log)}>Save</button>
            </div>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .btn {
    @apply px-4 py-2 bg-blue-500 text-white rounded; /* Button styles */
  }
  .input {
    @apply w-full px-4 py-2 border rounded; /* Input styles */
  }
  table {
    width: 100%;
    border-collapse: collapse; /* Table styles */
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px; /* Table cell styles */
  }
  th {
    background-color: #f4f4f4; /* Header cell styles */
  }
  .ml-2 {
    margin-left: 0.5rem; /* Margin left for spacing */
  }
  .comment-container {
    display: flex;
    align-items: center; /* Flexbox styles for comment container */
  }
  .input {
    margin-right: 0.5rem;
    flex: 1; /* Flexbox styles for input */
  }
  .date-filters {
    margin-bottom: 1rem; /* Margin bottom for date filters */
  }
  .logs-container {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease-out; /* Transition for logs container */
  }
  .logs-container.show {
    max-height: auto; /* Show logs container */
  }
</style>

<script lang="ts">
  import Calendar from '@event-calendar/core';
  import TimeGrid from '@event-calendar/time-grid';
  import { onMount, afterUpdate } from 'svelte';

  interface Logowanie {
    _id: string;
    date: string; // This should include date and time, e.g., '2024-07-30T08:00:00'
    entrence_time: string; // e.g., '08:00:00'
    exit_time: string; // e.g., '16:00:00'
    hours: number;
  }

  export let logowania: Logowanie[] = [];

  let plugins = [TimeGrid];
  let options = {
    initialView: 'timeGridWeek',
    locale: 'pl',
    slotMinTime: '06:00:00',
    slotMaxTime: '21:00:00',
    themeSystem: 'bootstrap',
    editable: true,
    selectable: true,
    events: [] // Will be updated dynamically
  };

  onMount(() => {
    updateCalendarEvents();
  });

  afterUpdate(() => {
    updateCalendarEvents();
  });

  function updateCalendarEvents() {
    options.events = logowania.map(log => {
      // Extract date and time from the log entry
      const startDateTime = `${log.date.split('T')[0]}T${log.entrence_time}`;
      const endDateTime = `${log.date.split('T')[0]}T${log.exit_time}`;

      return {
        id: log._id,
        title: `Wejście: ${log.entrence_time} Wyjście: ${log.exit_time}`,
        start: startDateTime,
        end: endDateTime,
        allDay: false
      };
    });

    console.log('Updated Events:', options.events); // Debug output
  }
</script>

<div class="outer-container flex flex-col min-h-screen">
  <div class="header-container flex items-center justify-between p-4 relative bg-white">
    <div class="calendar-container">
      <Calendar {plugins} {options} />
    </div>
  </div>
</div>

<style>
  .outer-container {
    @apply flex flex-col min-h-screen;
  }
  .header-container {
    @apply flex items-center justify-between p-4 relative bg-white;
  }
  .calendar-container {
    width: 120%; /* Increase width by 20% */
    max-width: 1200px; /* Optional: Set a maximum width */
    margin: 0 auto; /* Center the calendar horizontally */
    position: relative;
    left: -10%; /* Adjust the left position to compensate for the increased width */
    
  }
</style>

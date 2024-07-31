<script lang="ts">
  import Calendar from '@event-calendar/core';
  import TimeGrid from '@event-calendar/time-grid';
  import { onMount, afterUpdate } from 'svelte';

  interface Logowanie {
    _id: string;
    date: string; // This should include date and time, e.g., '2024-07-30T08:00:00'
    entrence_time: string; // e.g., '08:00:00'
    exit_time: string; // e.g., '16:00:00'
    hours: string; // Hours in 'hh:mm' format
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

  // Funkcja konwertująca czas w formacie hh:mm na godziny w postaci dziesiętnej
  const parseHoursFromString = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours + minutes / 60;
  };

  function updateCalendarEvents() {
    options.events = logowania.map(log => {
      // Extract date and time from the log entry
      const startDateTime = `${log.date.split('T')[0]}T${log.entrence_time}`;
      const endDateTime = `${log.date.split('T')[0]}T${log.exit_time}`;
      
      // Convert hours from hh:mm string to decimal
      const hoursWorked = parseHoursFromString(log.hours);

      const dayOfWeek = new Date(log.date).getDay();

      // Determine event color based on hours
      const backgroundColor = (hoursWorked < 8  && (dayOfWeek === 2 || dayOfWeek === 3 || dayOfWeek === 4 )) || (hoursWorked < 9  && dayOfWeek === 1)|| (hoursWorked < 7  && dayOfWeek === 5)? 'darkblue' : 'blue'; // Customize colors as needed
      
      return {
        id: log._id,
        title: `Wejście: ${log.entrence_time} Wyjście: ${log.exit_time}`,
        start: startDateTime,
        end: endDateTime,
        allDay: false,
        backgroundColor: backgroundColor,
        borderColor: backgroundColor
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

  /* Optional: Add styles for event colors */
  .fc-event-darkblue {
    background-color: rgb(168, 84, 102) !important;
    border-color: rgb(168, 84, 102) !important;

  }
  .fc-event-blue {
    background-color: blue !important;
    border-color: blue !important;
  }
</style>

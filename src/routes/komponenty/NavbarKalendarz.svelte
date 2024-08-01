<script lang="ts">
  import Calendar from '@event-calendar/core';
  import TimeGrid from '@event-calendar/time-grid';
  import { onMount, afterUpdate } from 'svelte';
  import tippy from 'tippy.js';
  import 'tippy.js/dist/tippy.css'; // Import Tippy.js CSS

  interface Logowanie {
    _id: string;
    date: string;
    entrence_time: string;
    exit_time: string;
    hours: string;
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
    events: [],
    eventDidMount: (info: any) => {
      // Używamy Tippy.js do wyświetlania tooltipów z niestandardowym stylem
      tippy(info.el, {
        content: `<div class="tooltip-content">
                    <h3 class="tooltip-header">Czas pracy</h3>
                    <p>Wejście: ${info.event.extendedProps.entrence_time}</p>
                    <p>Wyjście: ${info.event.extendedProps.exit_time}</p>
                  </div>`,
        allowHTML: true,
        placement: 'top',
        theme: 'custom',
      });
    },
    displayEventTime: false,
    eventContent: () => ''
  };

  onMount(() => {
    updateCalendarEvents();
  });

  afterUpdate(() => {
    updateCalendarEvents();
  });

  const parseHoursFromString = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours + minutes / 60;
  };

  function updateCalendarEvents() {
    options.events = logowania.map(log => {
      const startDateTime = `${log.date.split('T')[0]}T${log.entrence_time}`;
      const endDateTime = `${log.date.split('T')[0]}T${log.exit_time}`;
      const hoursWorked = Math.round(parseHoursFromString(log.hours));
      const dayOfWeek = new Date(log.date).getDay();

      let backgroundColor = '#3b82f6';
      
      if(hoursWorked < 8 && (dayOfWeek == 2 || dayOfWeek == 3 || dayOfWeek == 4)) {
        backgroundColor = '#d12e33';
      }
      else if(hoursWorked < 9 && dayOfWeek == 1) {
        backgroundColor = '#d12e33';
      }
      else if(hoursWorked < 7 && dayOfWeek == 5) {
        backgroundColor = '#d12e33';
      }

      return {
        id: log._id,
        title: `Wejście: ${log.entrence_time} Wyjście: ${log.exit_time}`,
        start: startDateTime,
        end: endDateTime,
        allDay: false,
        backgroundColor: backgroundColor,
        extendedProps: {
          entrence_time: log.entrence_time,
          exit_time: log.exit_time
        }
      };
    });
  }
</script>

<div class="outer-container flex flex-col min-h-screen">
  <div class="header-container flex items-center justify-between p-4 relative bg-white">
    <div class="calendar-container w-full max-w-7xl mx-auto my-0 relative -left-1/10">
      <Calendar {plugins} {options} />
    </div>
  </div>
</div>

<style>
  .tippy-box[data-theme~='custom'] {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  }

  .tooltip-content {
    padding: 10px;
  }

  .tooltip-header {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
  }
</style>

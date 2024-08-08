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
    hiddenDays: [0, 6], // Ukryj sobotę (6) i niedzielę (0)
    events: [],
    eventDidMount: (info: any) => {
      // Używamy Tippy.js do wyświetlania tooltipów z niestandardowym stylem
      tippy(info.el, {
        content: `<div class="p-2.5">
                    <h3 class="text-base font-bold mb-1.5">Czas pracy</h3>
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

<div class="flex flex-col">
  <Calendar {plugins} {options} />
</div>

<script lang="ts">
  import Calendar from '@event-calendar/core';
  import TimeGrid from '@event-calendar/time-grid';
  import { t, loadLanguage, currentLanguage } from '../../i18n.js'; // Importowanie funkcji i18n
  import { onMount, afterUpdate } from 'svelte';
  import tippy from 'tippy.js';
  import 'tippy.js/dist/tippy.css'; // Importowanie stylów Tippy.js
  import { writable } from 'svelte/store';

  interface Logowanie {
    _id: string;
    date: string;
    entrence_time: string;
    exit_time: string;
    hours: string;
    komentarz: string;
  }

  export let logowania: Logowanie[] = [];
  
  // Zmienna do przechowywania wybranego logowania
  let selectedLog = writable<Logowanie | null>(null);
  let showModal = writable(false);  // Zmienna do kontroli widoczności okienka

  let plugins = [TimeGrid];
  let options = {
    initialView: 'timeGridWeek',
    locale: currentLanguage,
    slotMinTime: '06:00:00',
    slotMaxTime: '21:00:00',
    themeSystem: 'bootstrap',
    allDaySlot: false,
    editable: true,
    selectable: true,
    hiddenDays: [0, 6], // Ukryj sobotę (6) i niedzielę (0)
    events: [],
    eventDidMount: (info: any) => {
      const isPresent = info.event.title === "Obecny"; // Sprawdzenie, czy tytuł to "Obecny"
      const tooltipContent = isPresent
        ? `<div class="p-2.5">
             <h3 class="text-base font-bold mb-1.5">${t('active')}</h3>
           </div>`
        : `<div class="p-2.5">
             <h3 class="text-base font-bold mb-1.5">${t('work_time')}</h3>
             <p> ${t('entrance')}: ${info.event.extendedProps.entrence_time}</p>
             <p>${t('exit')}: ${info.event.extendedProps.exit_time}</p>
           </div>`;

      // Używamy Tippy.js do wyświetlania tooltipów z niestandardowym stylem
      tippy(info.el, {
        content: tooltipContent,
        allowHTML: true,
        placement: 'top',
        theme: 'custom',
      });
    },
    displayEventTime: false,
    eventContent: () => '',

    // Obsługa kliknięcia na wydarzenie
    eventClick: (info: any) => {
      const clickedLog = logowania.find(log => log._id === info.event.id);
      if (clickedLog) {
        selectedLog.set(clickedLog);  // Ustawiamy wybrane logowanie
        showModal.set(true);  // Pokaż modal
      }
    }
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

      let endDateTime;
      let exitTime = log.exit_time;
      let eventTitle = `Wejście: ${log.entrence_time} Wyjście: ${exitTime}`;
      let backgroundColor = '#3b82f6';

      if (log.exit_time === "Obecny") {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        exitTime = `${hours}:${minutes}`;
        endDateTime = `${log.date.split('T')[0]}T${exitTime}`;
        eventTitle = "Obecny";  // Ustawienie tytułu na "Obecny"
        backgroundColor = '#34d399'; // Zmieniamy kolor paska na zielony
      } else {
        endDateTime = `${log.date.split('T')[0]}T${log.exit_time}`;
      }

      const hoursWorked = Math.round(parseHoursFromString(log.hours));
      const dayOfWeek = new Date(log.date).getDay();

      if (log.exit_time !== "Obecny") {
        if (hoursWorked < 8 && (dayOfWeek == 2 || dayOfWeek == 3 || dayOfWeek == 4)) {
          backgroundColor = '#d12e33';
        } else if (hoursWorked < 9 && dayOfWeek == 1) {
          backgroundColor = '#d12e33';
        } else if (hoursWorked < 7 && dayOfWeek == 5) {
          backgroundColor = '#d12e33';
        }
      }

      return {
        id: log._id,
        title: eventTitle,  // Ustawienie poprawnego tytułu
        start: startDateTime,
        end: endDateTime,
        allDay: false,
        backgroundColor: backgroundColor,
        extendedProps: {
          entrence_time: log.entrence_time,
          exit_time: exitTime
        }
      };
    });
  }

  function closeModal() {
    showModal.set(false);
  }

  function handleBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      closeModal();
    }
  }
</script>

<!-- Modal do wyświetlania szczegółów logu -->
{#if $showModal}
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 modal-backdrop" on:click={handleBackdropClick}>
    <div class="bg-white p-5 rounded shadow-lg max-w-md w-full">
      <h2 class="text-xl font-bold mb-4">{t('selected')}</h2>
      {#if $selectedLog}
        <p><strong>{t('date')}:</strong> {$selectedLog.date}</p>
        <p><strong>{t('entrance')}:</strong> {$selectedLog.entrence_time}</p>
        <p><strong>{t('exit')}:</strong> {$selectedLog.exit_time}</p>
        <p><strong>{t('hours')}:</strong> {$selectedLog.hours}</p>
        <p><strong>{t('comment')}:</strong> {$selectedLog.komentarz || t('no_comment')}</p>
      {/if}
      <button class="mt-4 bg-blue-500 text-white py-2 px-4 rounded" on:click={closeModal}>{t('exit')}</button>
    </div>
  </div>
{/if}

<!-- Kalendarz -->
<div class="flex flex-col m-5 z-90">
  <Calendar {plugins} {options} />
</div>

<script lang="ts">
  import Calendar from '@event-calendar/core';
  import TimeGrid from '@event-calendar/time-grid';
  import DayGrid from '@event-calendar/day-grid';
  import { t, loadLanguage, currentLanguage } from '../../i18n.js'; // Importowanie funkcji i18n
  import { onMount, afterUpdate } from 'svelte';
  import tippy from 'tippy.js';
  import 'tippy.js/dist/tippy.css'; // Importowanie stylów Tippy.js
  import { writable } from 'svelte/store';
  import { exportDate } from '../stores/stores'; // Importujemy store

  interface Logowanie {
    _id: string;
    date: string;
    entrence_time: string;
    exit_time: string;
    hours: string;
    komentarz: string;
    is_edit: boolean;
    type: string;
  }
  let cal;
  let plugins = [TimeGrid, DayGrid]
  let options = {
    view: 'timeGridWeek',
    locale: currentLanguage,
    slotMinTime: '06:00:00',
    slotMaxTime: '20:00:00',
    themeSystem: 'bootstrap',
    allDaySlot: false,
    editable: true,
    selectable: true,
    customButtons: {
      widokMiesieczny: {
        text: "Widok Miesięczny",
        click: () => {
          options.view == "timeGridWeek"
          ? options.view = "dayGridMonth"
          : options.view = "timeGridWeek";
        }
      }
    },
    headerToolbar: {
      start: 'title widokMiesieczny',
      center: '',
      end: 'today prev,next'
    },
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
        exportDate.set(clickedLog.date);  // Ustawiamy exportDate na datę klikniętego logu
        showModal.set(true);  // Pokaż modal
      }
    }
  }

  export let logowania: Logowanie[] = [];
  
  // Zmienna do przechowywania wybranego logowania
  let selectedLog = writable<Logowanie | null>(null);
  let showModal = writable(false);  // Zmienna do kontroli widoczności okienka
  

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
  // Mapa przechowująca sumę godzin pracy dla każdego dnia
  const dailyHoursMap = logowania.reduce((acc, log) => {
    const day = log.date.split('T')[0]; // Zapisujemy tylko dzień, bez godziny
    const hours = parseHoursFromString(log.hours); // Parsowanie godzin dla pojedynczego logowania
    
    if (!acc[day]) {
      acc[day] = 0; // Inicjalizacja sumy godzin dla tego dnia
    }
    
    acc[day] += hours; // Dodanie godzin do sumy dla danego dnia
    
    return acc;
  }, {});

  options.events = logowania
    .map((log) => {
      const startDateTime = `${log.date.split('T')[0]}T${log.entrence_time}`;

      let endDateTime;
      let exitTime = log.exit_time;
      let eventTitle = `Wejście: ${log.entrence_time} Wyjście: ${exitTime}`;
      let backgroundColor = '#3b82f6'; // Domyślnie niebieski

      if (log.exit_time === 'Obecny') {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        exitTime = `${hours}:${minutes}`;
        endDateTime = `${log.date.split('T')[0]}T${exitTime}`;
        eventTitle = 'Obecny'; // Ustawienie tytułu na "Obecny"
        backgroundColor = '#34d399'; // Zielony dla aktywnego
      } else {
        endDateTime = `${log.date.split('T')[0]}T${log.exit_time}`;
      }

      const dayOfWeek = new Date(log.date).getDay();
      const hoursWorked = Math.round(dailyHoursMap[log.date.split('T')[0]]); // Pobieranie sumy godzin z dailyHoursMap

      // Sprawdzenie, czy logowanie zostało edytowane
      if (log.is_edit) {
        backgroundColor = '#a855f7'; // Fioletowy dla edytowanego
      } else if (log.exit_time !== 'Obecny') {
        if (
          (dayOfWeek === 1 && hoursWorked < 9) || // Poniedziałek
          ((dayOfWeek >= 2 && dayOfWeek <= 4) && hoursWorked < 8) || // Wtorek do czwartku
          (dayOfWeek === 5 && hoursWorked < 7) // Piątek
        ) {
          backgroundColor = '#d12e33'; // Czerwony dla niewystarczającej liczby godzin
        }
      }

      // Sprawdzenie typu "w"
      if (log.type === 'w') {
        // Obsługa braku komentarza (czarny kolor)
        if (!log.komentarz) {
          backgroundColor = '#000000'; // Czarny, gdy brak komentarza
        }

        // Obsługa "Wyjścia Prywatnego" (brak wydarzenia)
        if (log.komentarz === 'Wyjście Prywatne') {
          return null; // Brak wydarzenia w kalendarzu
        }

        // Obsługa "Wyjścia Służbowego" (niebieski kolor)
        if (log.komentarz === 'Wyjście Służbowe') {
          backgroundColor = '#3b82f6'; // Niebieski dla wyjścia służbowego
        }
      }

      return {
        id: log._id,
        title: eventTitle, // Ustawienie poprawnego tytułu
        start: startDateTime,
        end: endDateTime,
        allDay: false,
        backgroundColor: backgroundColor,
        extendedProps: {
          entrence_time: log.entrence_time,
          exit_time: exitTime,
        },
      };
    })
    .filter((event) => event !== null); // Usuwanie null, czyli "Wyjścia Prywatne"
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


<!-- Kalendarz -->
<div class="flex flex-col m-1 z-90 mb-0">
  <Calendar bind:this={cal} {plugins} {options} />  
</div>

<div class="mt-4 flex flex-col gap-2">
  <div class="flex items-center">
    <div class="w-4 h-4 bg-red-600 mr-2"></div>
    <span>{t('insufficient_hours')}</span>
  </div>
  <div class="flex items-center">
    <div class="w-4 h-4 bg-blue-500 mr-2"></div>
    <span>{t('sufficient_hours')}</span>
  </div>
  <div class="flex items-center">
    <div class="w-4 h-4 bg-green-500 mr-2"></div>
    <span>{t('active')}</span>
  </div>
  <div class="flex items-center">
    <div class="w-4 h-4 bg-purple-500 mr-2"></div>
    <span>{t('edited')}</span>
  </div>
</div>


<script>
  //export let miesiac;
  //export let rok;
  import Calendar from '@event-calendar/core';
  import TimeGrid from '@event-calendar/time-grid';

  let plugins = [TimeGrid];
  let options = {
      view: 'timeGridWeek',
      events: [
          // your list of events
          {
            id: "1",
            allDay: true,
            title: "pokoj"
          }
      ]
  };
</script>

<div class="outer-container flex flex-col min-h-screen">
  <div class="header-container flex items-center justify-between p-4 relative bg-white">
    <Calendar {plugins} {options} />
  </div>
</div>


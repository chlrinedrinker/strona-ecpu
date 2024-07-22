<script>
  export let miesiac;
  export let rok;
</script>

<div class="flex items-center justify-between mb-4">
  <h1 class="text-2xl font-semibold">Kalendarz {miesiac} {rok}</h1>
  <div class="space-x-2">
      <button class="btn">Publikuj</button>
      <button class="btn">Akcje grupowe</button>
      <button class="btn">Kreator</button>
  </div>
</div>

<style>
  .btn {
      @apply px-4 py-2 bg-blue-500 text-white rounded;
  }
</style>

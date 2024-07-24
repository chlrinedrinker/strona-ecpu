<script>
  //export let miesiac;
  //export let rok;
</script>

<div class="outer-container">
  <div class="header-container">
    
    <div class="right-buttons">
      <button class="btn">Publikuj</button>
      <button class="btn">Akcje grupowe</button>
      <button class="btn">Kreator</button>
    </div>
  </div>
</div>

<style>
  .outer-container {
    @apply flex flex-col min-h-screen;
  }

  .header-container {
    @apply flex items-center justify-between p-4;
    background-color: #ffff; /* Kolor tła nagłówka */
    position: relative;
  }

  .header-container h1 {
    @apply text-2xl font-semibold flex-grow text-center;
    margin-left: 40px; /* Przesuwa nagłówek w prawo */
  }

  .right-buttons {
    @apply flex space-x-2; /* Rozmieszcza przyciski po prawej stronie z odstępem */
  }

  .btn {
    @apply px-4 py-2 bg-blue-500 text-white rounded;
  }
</style>

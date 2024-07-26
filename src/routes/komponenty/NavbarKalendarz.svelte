<script>
  // Variables `miesiac` and `rok` can be exported if needed in the future
  // export let miesiac;
  // export let rok;
</script>

<div class="outer-container">
  <div class="header-container">
    <div class="right-buttons">
      <button class="btn">Publikuj</button> <!-- Publish button -->
      <button class="btn">Akcje grupowe</button> <!-- Group actions button -->
      <button class="btn">Kreator</button> <!-- Creator button -->
    </div>
  </div>
</div>

<style>
  .outer-container {
    @apply flex flex-col min-h-screen; /* Apply Tailwind CSS classes */
  }

  .header-container {
    @apply flex items-center justify-between p-4;
    background-color: #ffff; /* Header background color */
    position: relative;
  }

  .header-container h1 {
    @apply text-2xl font-semibold flex-grow text-center;
    margin-left: 40px; /* Moves the header to the right */
  }

  .right-buttons {
    @apply flex space-x-2; /* Arranges buttons on the right with spacing */
  }

  .btn {
    @apply px-4 py-2 bg-blue-500 text-white rounded; /* Button styles */
  }
</style>

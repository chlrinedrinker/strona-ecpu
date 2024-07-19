<script>
  import "../app.css";
</script>

<container class="flex flex-col h-screen">
  <!-- Navbar -->
  <nav>
    <div class="flex items-center justify-between p-4 bg-gray-100 border-b">
      <div class="flex items-center space-x-4">
        <img src="/herb.png" alt="Logo" class="h-8">
        <div>Gmina Łubnice</div>
      </div>
      <div class="flex items-center space-x-4">
        <button class="btn">Zespół</button>
        <button class="btn">Kalendarz</button>
        <button class="btn">Wnioski</button>
        <button class="btn">RCP</button>
        <button class="btn">Raporty</button>
        <div class="flex items-center space-x-2">
          <div class="text-sm">Czas pracy</div>
          <div class="text-lg font-semibold"></div>
        </div>
        <div class="w-10 h-10 rounded-full bg-gray-300"><img src="user.png" alt="User"></div>
      </div>
    </div>
  </nav>

  <slot />
  
  <div class="p-4 bg-gray-100 border-t text-center">
    <p>&copy; 2024 Gmina Łubnice. Wszelkie prawa zastrzeżone.</p>
  </div>
  

</container>

<style>
  .btn {
    @apply px-4 py-2 bg-blue-500 text-white rounded;
  }
</style>
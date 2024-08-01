<script>
  import "../app.css";
  import Navbar from './navbar/navbar.svelte'
  import { enhance } from "$app/forms";
</script>

<container class="flex flex-col h-screen">
  <!-- Navbar -->
  <Navbar/>
  <slot />

  <div class="p-4 bg-gray-100 border-t text-center">
    <p>&copy; 2024 Gmina Łubnice. Wszelkie prawa zastrzeżone.</p>
  </div>
  
</container>
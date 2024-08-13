<script>
  import "../app.css";
  import Navbar from './navbar/navbar.svelte'
  import { page } from "$app/stores";

    const appName = "Ewidencja Czasu Pracy";
    $: title = [appName, ...$page.url.pathname.split("/").slice(1)].filter(Boolean).join(" - ");
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<container class="flex flex-col relative w-full">
  <!-- Navbar -->
  <Navbar/>
  <slot />

  <div class="p-4 bg-gray-100 border-t text-center">
    <p>&copy; 2024 Gmina Łubnice. Wszelkie prawa zastrzeżone.</p>
  </div>
  
</container>

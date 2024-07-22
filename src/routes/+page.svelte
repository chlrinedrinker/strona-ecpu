<script lang="ts">
  import { onMount } from 'svelte';
  import { isLoggedIn } from './stores/stores';
  import ZakresDat from './komponenty/ZakresDat.svelte';
  import Uzytkownicy from './komponenty/Uzytkownicy.svelte'
  import NavbarKalendarz from './komponenty/NavbarKalendarz.svelte';
  import ShowLogs from './komponenty/ShowLogs.svelte';
  import { goto } from '$app/navigation';

  let currentTime = '';

   let miesiace : String[] = new Array("styczeń", "luty", "marzec", "kwiecień", "maj",
  "czerwiec", "lipiec", "sierpnień", "wrzesień", "październik", "listopad",
  "grudzień");

  let year : String;
  let month : String;

  interface Pracownik { 
    imie: string;
    nazwisko: string;
    stanowisko: string;
  }

  function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    month = miesiace[now.getMonth()];
    year = String(now.getFullYear()).padStart(2, '0');
    currentTime = `${hours}:${minutes}:${seconds}`;
  }
  
  let loggedIn: boolean;

  const unsubscribe = isLoggedIn.subscribe(value => {
    loggedIn = value;
    console.log(loggedIn)
  });

  function goToLogin(value: boolean) {
    if(!value) {
      goto('/login')
    }
  }

  onMount(() => {
    unsubscribe();
    getCurrentTime();
    goToLogin(loggedIn)

    const interval = setInterval(getCurrentTime, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  let selectedUser: Pracownik | null = null;

function selectUser(user: Pracownik) {
  selectedUser = user;
}
  
</script>

<div class="flex flex-grow">
  <ZakresDat/>

  <!-- Main Content -->
  <div class="flex-grow p-4">
      <NavbarKalendarz miesiac={month}, rok={year}/>
    </div>
    <div class="flex space-x-4">
      <!-- Users List -->
      <Uzytkownicy/>
      <!-- Schedule -->
      <div class="flex-grow">
        <!-- Render schedule based on the user's data -->
      </div>
    </div>
  </div>

  <!-- Right Sidebar -->
  <div class="w-64 p-4 border-l">

  </div>
<style>
</style>

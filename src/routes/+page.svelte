<script lang="ts">
  import { onMount } from 'svelte';
  import { isLoggedIn } from './stores/stores';
  import { goto } from '$app/navigation';
  import ZakresDat from './komponenty/ZakresDat.svelte';
  import Uzytkownicy from './komponenty/Uzytkownicy.svelte'
  import NavbarKalendarz from './komponenty/NavbarKalendarz.svelte';
  import { enhance } from "$app/forms";
	/** @type {import('./$types').PageData} */
	export let data : any;

  console.log(data)

  let currentTime = '';

  interface Pracownik { 
    imie: string;
    nazwisko: string;
    stanowisko: string;
  }

   let miesiace : String[] = new Array("styczeń", "luty", "marzec", "kwiecień", "maj",
  "czerwiec", "lipiec", "sierpnień", "wrzesień", "październik", "listopad",
  "grudzień");

  let year : String;
  let month : String;


  function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    month = miesiace[now.getMonth()];
    year = String(now.getFullYear()).padStart(2, '0');
    currentTime = `${hours}:${minutes}:${seconds}`;
  }

  let selectedUser: Pracownik | null = null;

function selectUser(user: Pracownik) {
  selectedUser = user;
}
 
 onMount(() => {
  $isLoggedIn = true;
 })
</script>

<div class="flex flex-grow">
  <ZakresDat/>

  <div class="flex space-x-4">
    <!-- Users List -->
    <Uzytkownicy />
    <!-- Schedule -->
    <div class="flex-grow">
      <!-- Render schedule based on the user's data -->
    </div>
  </div>
  <!-- Main Content -->
  <div class="flex-grow p-4">
      <NavbarKalendarz miesiac={month}, rok={year}/>
    </div>
  </div>


<style>
</style>

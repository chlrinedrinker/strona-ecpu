<script lang="ts">
  import { onMount } from 'svelte';
  import Uzytkownik from "./Uzytkownik.svelte";
  interface Pracownik {
    imie: string;
    nazwisko: string;
    stanowisko: string;
  }

  let pracownicy: Pracownik[] = [];
  let error: string | null = null;
  
  onMount(async() => {
    try{
      const response = await fetch('../pracownicy');
      if (response.ok) {
        pracownicy = await response.json();
      } else {
        error = 'Nie'
      }
    } catch (err) {
      error = 'Błąd podczas ładowania pracowników'
    }
  });


</script>

<div class="w-64">
    {#each pracownicy as user}
      <Uzytkownik imie ={user.imie}, nazwisko={user.nazwisko}, stanowisko={user.stanowisko}/>
    {/each}
</div>
<script lang="ts">
  import { onMount } from 'svelte';
  import Uzytkownik from "./Uzytkownik.svelte";

  interface Pracownik {
    imie: string;
    nazwisko: string;
    stanowisko: string;
  }

export let Pracownicy: Pracownik[];

</script>

<div class="w-64">
    {#each Pracownicy as user}
      <Uzytkownik imie ={user.imie}, nazwisko={user.nazwisko}, stanowisko={user.stanowisko}/>
    {/each}
</div>
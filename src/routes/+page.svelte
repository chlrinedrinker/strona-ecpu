<script lang="ts">
  import { onMount } from 'svelte';
  import { isLoggedIn, userType, imieNazwisko } from './stores/stores';
  import ZakresDat from './komponenty/ZakresDat.svelte';
  import Uzytkownicy from './komponenty/Uzytkownicy.svelte'
	import type { PageData } from './$types';
	export let data : PageData;
 
 onMount(() => {
  $isLoggedIn = true;
  $userType = data.session.ranga;
 })
</script>

<div class="flex flex-grow">
  <ZakresDat/>

  <div class="flex space-x-4">
    <!-- Users List -->
    <Uzytkownicy pracownicy={data.pracownicy} />
    <!-- Schedule -->
    <div class="flex-grow">
      <!-- Render schedule based on the user's data -->
    </div>
  </div>
  <!-- Main Content -->


  </div>


<style>
</style>

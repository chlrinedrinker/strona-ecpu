<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let imie: string; // User's first name
  export let nazwisko: string; // User's last name
  export let stanowisko: string; // User's position
  export let selected: boolean = false; // Whether the user is selected

  const dispatch = createEventDispatcher(); // Event dispatcher for the select event

  // Handle user click to select the user
  function handleClick() {
      dispatch('select', { imie, nazwisko, stanowisko });
  }
</script>

<!-- User button -->
<button 
  type="button" 
  class="flex items-center w-full p-2 space-x-2 border-b cursor-pointer text-left object-fill width {selected ? 'border-blue-500' : ''}" 
  on:click={handleClick}>
  <img src="/user.png" alt="person" class="w-10 h-10 rounded-full bg-gray-300">
  <div>
      <div class="text-sm font-semibold">{imie} {nazwisko}</div>
      <div class="text-xs text-gray-500">{stanowisko}</div>
  </div>
</button>

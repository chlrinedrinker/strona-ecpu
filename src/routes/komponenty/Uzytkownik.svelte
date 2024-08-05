<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let imie: string;
  export let nazwisko: string;
  export let stanowisko: string;
  export let _id: string;
  export let selected: boolean = false;
  export let active: boolean = false;

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch('select', { imie, nazwisko, stanowisko, _id });
  }
</script>

<button 
  type="button" 
  class="flex items-center w-full p-2 space-x-2 border-b cursor-pointer text-left object-fill width {selected ? 'border-blue-500' : ''}" 
  on:click={handleClick}>
  <div class="relative">
    <img src="/user.png" alt="person" class="w-10 h-10 rounded-full bg-gray-300">
    {#if active}
      <span class="absolute right-0 bottom-0 w-3 h-3 bg-green-500 rounded-full border border-white"></span>
    {/if}
  </div>
  <div>
    <div class="text-sm font-semibold">{imie} {nazwisko}</div>
    <div class="text-xs text-gray-500">{stanowisko}</div>
  </div>
</button>

<style>
  .absolute {
    position: absolute;
  }
  .bg-green-500 {
    background-color: #48bb78;
  }
  .rounded-full {
    border-radius: 9999px;
  }
  .border {
    border-width: 1px;
  }
  .border-white {
    border-color: #ffffff;
  }
</style>

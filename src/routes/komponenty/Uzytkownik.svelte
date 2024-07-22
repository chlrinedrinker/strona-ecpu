<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let imie: string;
  export let nazwisko: string;
  export let stanowisko: string;

  const dispatch = createEventDispatcher();

  function handleClick() {
      dispatch('select', { imie, nazwisko, stanowisko });
  }
</script>

<button type="button" class="flex items-center w-full p-2 space-x-2 border-b cursor-pointer text-left object-fill width" on:click={handleClick}>
  <img src="/user.png" alt="person" class="w-10 h-10 rounded-full bg-gray-300">
  <div>
      <div class="text-sm font-semibold">{imie} {nazwisko}</div>
      <div class="text-xs text-gray-500">{stanowisko}</div>
  </div>
</button>

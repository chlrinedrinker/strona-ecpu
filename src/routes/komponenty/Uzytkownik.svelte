<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let imie: string;
    export let nazwisko: string;
    export let stanowisko: string;
    export let _id: string;
    export let selected: boolean = false;
    export let active: boolean = false;

    const dispatch = createEventDispatcher();

    function handleClick() {
        dispatch("select", { imie, nazwisko, stanowisko, _id });
    }
</script>

<button
    type="button"
    class="flex items-center w-full p-1 space-x-1 border-b cursor-pointer text-left {selected ? 'border-blue-500' : ''}"
    on:click={handleClick}
>
    <div class="relative flex-shrink-0">
        <img
            src="/user.png"
            alt="person"
            class="w-8 h-8 rounded-full bg-gray-300"
        />
        {#if active}
            <span
                class="absolute right-0 bottom-0 w-2 h-2 bg-green-500 rounded-full border border-white"
            ></span>
        {/if}
    </div>
    <div class="flex-1 min-w-0">
        <div class="text-xs font-semibold truncate">{imie} {nazwisko}</div>
        <div class="text-[10px] text-gray-500 truncate">{stanowisko}</div>
    </div>
</button>


<script lang="ts">
    import { onMount } from "svelte";
    import { isLoggedIn, userType, imieNazwisko } from "./stores/stores";
    import Uzytkownicy from "./komponenty/Uzytkownicy.svelte";
    import type { PageData, ActionData } from "./$types";
    export let data: PageData;
    export let form: ActionData
    onMount(() => {
        $isLoggedIn = true;
        $userType = data.session!.ranga;
    });
</script>

<div class="flex flex-grow">
    <div class="flex space-x-4 w-full">
        <!-- Users List -->
        <Uzytkownicy
            pracownicy={data.pracownicy}
            aktywniPracownicy={data.active}
            form={form}
        />
        <!-- Schedule -->
        <div class="flex-grow">
            <!-- Render schedule based on the user's data -->
        </div>
    </div>
    <!-- Main Content -->
</div>

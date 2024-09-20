<script lang="ts">
    import { onMount } from "svelte";
    import { enhance } from "$app/forms";
    import { t, loadLanguage,currentLanguage } from '../../i18n.js'; // Importing the i18n functions
    export let form;

    let successMessage = "";
    let errors = {
        imie: "",
        nazwisko: "",
        stanowisko: "",
        cardID: "",
        fingerID: "",
        username: "",
        password: "",
    };

    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        successMessage =
            urlParams.get("success") === "true"
                ? "Poprawnie zmieniono Hasło"
                : "";
    });

</script>

<main
    class="flex flex-col items-center justify-center h-screen bg-gray-100 p-6"
>
    <h1 class="text-5xl font-bold mb-4">{t('change_password')}</h1>
    {#if form?.succes}
        <p class="text-green-500 mb-4">Poprawnie zmieniono Hasło</p>
    {/if}
    <form
        class="flex flex-col gap-4 p-8 bg-white rounded-lg shadow-md w-full max-w-3xl"
        method="post"
        use:enhance
        action="?/ZmianaHasla"
    >
        <!-- Nazwa użytkownika i Hasło -->
        <div class="flex gap-4">
            <div class="flex-1">
                <label for="username" class="block mb-2">{t('current_password')}:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    class="w-full p-2 border border-gray-300 rounded"
                />
                {#if form?.invalid}
                    <p class="text-red-500 text-sm mt-1">{form.invalid}</p>
                {/if}
            </div>
            <div class="flex-1">
                <label for="password" class="block mb-2">{t('new_password')}:</label>
                <input
                    type="password"
                    id="password_repeat"
                    name="password_repeat"
                    required
                    class="w-full p-2 border border-gray-300 rounded"
                />
                {#if form?.notsame}
                    <p class="text-red-500 text-sm mt-1">{form?.notsame}</p>
                {/if}
            </div>
        </div>

        <button
            type="submit"
            class="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >{t('change_password')}</button
        >
    </form>
</main>

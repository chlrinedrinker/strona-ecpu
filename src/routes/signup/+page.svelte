<script lang="ts">
    import { onMount } from "svelte";
    import { enhance } from "$app/forms";
    import { t} from '../../i18n.js'; // Importing the i18n functions

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
                ? "Poprawnie dodano użytkownika"
                : "";
    });

    function validate(event: Event) {
        // Reset errors
        errors = {
            imie: "",
            nazwisko: "",
            stanowisko: "",
            cardID: "",
            fingerID: "",
            username: "",
            password: "",
        };

        const formData = new FormData(event.target as HTMLFormElement);

        // Imie validation
        const imie = formData.get("imie") as string | null;
        if (!imie || !/[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]*/.test(imie)) {
            errors.imie = "Imię może zawierać tylko litery.";
        }

        // Nazwisko validation
        const nazwisko = formData.get("nazwisko") as string | null;
        if (!nazwisko || !/[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]*/.test(nazwisko)) {
            errors.nazwisko = "Nazwisko może zawierać tylko litery.";
        }

        // CardID validation
        const cardID = formData.get("cardID") as string | null;
        if (!cardID || cardID.length < 6) {
            errors.cardID = "Kod Karty musi mieć co najmniej 6 znaków.";
        }

        // FingerID validation
        const fingerID = formData.get("fingerID") as string | null;
        if (!fingerID || fingerID.length < 6) {
            errors.fingerID =
                "Kod Odcisku Palca musi mieć co najmniej 6 znaków.";
        }

        // Username validation
        const username = formData.get("username") as string | null;
        if (!username || username.length < 3) {
            errors.username =
                "Nazwa użytkownika musi mieć co najmniej 3 znaki.";
        }

        // Password validation
        const password = formData.get("password") as string | null;
        if (!password || password.length < 6) {
            errors.password = "Hasło musi mieć co najmniej 6 znaków.";
        }

        // If there are any errors, prevent form submission
        if (Object.values(errors).some((error) => error !== "")) {
            event.preventDefault();
        } else {
            // If no errors, redirect to the success page
            // window.location.href = "/signup?success=true";
        }
    }
</script>

<main class="flex flex-col items-center justify-center h-screen bg-gray-100 p-4 sm:p-6">
    <h1 class="text-3xl  sm:text-5xl font-bold mb-1 mt-4 sm: mb-3 mt-0">{t('registration')}</h1>
    {#if successMessage}
        <p class="text-green-500 mb-4 text-center">{successMessage}</p>
    {/if}
    <form
        class="flex flex-col gap-4 p-6 sm:p-8 bg-white rounded-lg shadow-md w-full max-w-lg sm:max-w-3xl"
        method="post"
        use:enhance
        on:submit={validate}
        action="?/signup"
    >
        <!-- Imie i Nazwisko -->
        <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1">
                <label for="imie" class="block mb-2">{t('first_name')}:</label>
                <input
                    type="text"
                    id="imie"
                    name="imie"
                    required
                    class="w-full p-2 border border-gray-300 rounded"
                />
                {#if errors.imie}
                    <p class="text-red-500 text-sm mt-1">{errors.imie}</p>
                {/if}
            </div>
            <div class="flex-1">
                <label for="nazwisko" class="block mb-2">{t('last_name')}:</label>
                <input
                    type="text"
                    id="nazwisko"
                    name="nazwisko"
                    required
                    class="w-full p-2 border border-gray-300 rounded"
                />
                {#if errors.nazwisko}
                    <p class="text-red-500 text-sm mt-1">{errors.nazwisko}</p>
                {/if}
            </div>
        </div>

        <!-- Typ użytkownika i Stanowisko -->
        <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1">
                <label for="ranga" class="block mb-2">{t('select_user_type')}:</label>
                <select
                    name="ranga"
                    id="ranga"
                    class="w-full p-2 border border-gray-300 rounded"
                >
                    <option value="0">Admin</option>
                    <option value="1">Boss</option>
                    <option value="2">User</option>
                </select>
            </div>
            <div class="flex-1">
                <label for="stanowisko" class="block mb-2">{t('position')}:</label>
                <input
                    type="text"
                    id="stanowisko"
                    name="stanowisko"
                    class="w-full p-2 border border-gray-300 rounded"
                />
                {#if errors.stanowisko}
                    <p class="text-red-500 text-sm mt-1">{errors.stanowisko}</p>
                {/if}
            </div>
        </div>

        <!-- Kod Karty i Kod Odcisku Palca -->
        <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1">
                <label for="cardID" class="block mb-2">{t('card_code')}:</label>
                <input
                    type="text"
                    id="cardID"
                    name="cardID"
                    class="w-full p-2 border border-gray-300 rounded"
                />
                {#if errors.cardID}
                    <p class="text-red-500 text-sm mt-1">{errors.cardID}</p>
                {/if}
            </div>
            <div class="flex-1">
                <label for="fingerID" class="block mb-2">{t('fingerprint_code')}:</label>
                <input
                    type="text"
                    id="fingerID"
                    name="fingerID"
                    class="w-full p-2 border border-gray-300 rounded"
                />
                {#if errors.fingerID}
                    <p class="text-red-500 text-sm mt-1">{errors.fingerID}</p>
                {/if}
            </div>
        </div>

        <!-- Nazwa użytkownika i Hasło -->
        <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1">
                <label for="username" class="block mb-2">{t('username')}:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    class="w-full p-2 border border-gray-300 rounded"
                />
                {#if errors.username}
                    <p class="text-red-500 text-sm mt-1">{errors.username}</p>
                {/if}
            </div>
            <div class="flex-1">
                <label for="password" class="block mb-2">{t('password')}:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    class="w-full p-2 border border-gray-300 rounded"
                />
                {#if errors.password}
                    <p class="text-red-500 text-sm mt-1">{errors.password}</p>
                {/if}
            </div>
        </div>

        <button
            type="submit"
            class="w-full py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
        {t('registration')}
        </button>
    </form>
</main>

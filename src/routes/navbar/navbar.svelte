<script>
    import { enhance } from "$app/forms"; // SvelteKit form enhancement
    import { isLoggedIn, userType } from "../stores/stores"; // Store for login state
    const logged = isLoggedIn; // Get the login state
    let isDropdownOpen = false;
    const handleDropdownClick = () => {
        isDropdownOpen = !isDropdownOpen; // togle state on click
    };

    const handleDropdownFocusLoss = ({ relatedTarget, currentTarget }) => {
        // use "focusout" event to ensure that we can close the dropdown when clicking outside or when we leave the dropdown with the "Tab" button
        if (
            relatedTarget instanceof HTMLElement &&
            currentTarget.contains(relatedTarget)
        )
            return; // check if the new focus target doesn't present in the dropdown tree (exclude ul\li padding area because relatedTarget, in this case, will be null)
        isDropdownOpen = false;
    };
</script>

<div class="flex items-center justify-between p-4 bg-gray-100 border-b z-100">
    <div class="flex items-center space-x-4">
        <a href="/">
            <img src="/herb.png" alt="Logo" class="h-8" />
        </a>
        <a href="/">
            <div>Gmina Łubnice</div>
        </a>
    </div>
    {#if $logged}
        <div class="flex items-center space-x-4">
            <a href="/zmianaHaslaIndiwidualna">
                <button class="px-4 py-2 bg-blue-500 text-white rounded"
                    >Zmień Hasło</button
                ></a
            >
            <button class="px-4 py-2 bg-blue-500 text-white rounded"
                >Raporty</button
            >
            <div class="flex items-center space-x-2">
                <form method="post" use:enhance action="?/wyloguj">
                    <button class="px-4 py-2 bg-blue-500 text-white rounded"
                        >Wyloguj się</button
                    >
                </form>
                {#if $userType == 0}
                    <div
                        class="dropdown relative"
                        on:focus={handleDropdownFocusLoss}
                    >
                        <button
                            class="px-4 py-2 bg-blue-500 text-white rounded m-1"
                            on:click={handleDropdownClick}
                        >
                            <h1>
                                <a href="zmianaHasel">Panel Administracyjny</a>
                            </h1>
                        </button>
                    </div>
                    <a href="/signup"
                        ><button
                            class="px-4 py-2 bg-blue-500 text-white rounded"
                            >Zarejestruj użytkownika</button
                        ></a
                    >
                {/if}
            </div>
            <div class="w-10 h-10 rounded-full bg-gray-300">
                <img src="user.png" alt="User" />
            </div>
        </div>
    {/if}
</div>

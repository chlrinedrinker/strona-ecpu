<!-- src/routes/login.svelte -->
<script lang="ts">
    import { enhance } from "$app/forms"; // SvelteKit form enhancement
    import { onMount } from "svelte"; // Svelte lifecycle hook
    import { isLoggedIn } from "../stores/stores"; // Store for login state
    export let form;

    // On mount, set the login state to false
    onMount(() => {
        $isLoggedIn = false;
    });
</script>

<main class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <h1 class="text-2xl font-bold mb-4">Login</h1>
    <form
        class="flex flex-col gap-4 p-8 bg-white rounded-lg shadow-md"
        method="post"
        use:enhance
    >
        <div>
            <label for="username" class="block mb-2">Username:</label>
            <input
                type="text"
                id="username"
                name="username"
                required
                class="w-full p-2 border border-gray-300 rounded"
            />
        </div>
        <div>
            <label for="password" class="block mb-2">Password:</label>
            <input
                type="password"
                id="password"
                name="password"
                required
                class="w-full p-2 border border-gray-300 rounded"
            />
        </div>
        {#if form?.message}
            <p class="text-red-500 text-sm mt-1">{form.message}</p>
        {/if}
        <button
            type="submit"
            class="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >Login
        </button>
    </form>
</main>

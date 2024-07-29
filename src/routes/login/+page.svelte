<!-- src/routes/login.svelte -->
<script lang="ts">
  import { enhance } from "$app/forms"; // SvelteKit form enhancement
  import { onMount } from "svelte"; // Svelte lifecycle hook
  import { isLoggedIn } from "../stores/stores"; // Store for login state
  let successMessage = '';
	let errors = {
		username: '',
		password: ''
	};
  // On mount, set the login state to false
  onMount(() => {
    $isLoggedIn = false;
  })
  function validate(event: Event) {
		// Reset errors
		errors = {
			username: '',
			password: ''
		};

		const formData = new FormData(event.target as HTMLFormElement);
		// Username validation
		const username = formData.get('username') as string | null;
		if (!username || username.length < 3) {
			errors.username = 'Niepoprawna nazwa użytkownika.';
		}

		// Password validation
		const password = formData.get('password') as string | null;
		if (!password || password.length < 6) {
			errors.password = 'Niepoprawne hasło.';
		}

		
	}
  </script>
  
  <main class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <h1 class="text-2xl font-bold mb-4">Login</h1>
    <form class="flex flex-col gap-4 p-8 bg-white rounded-lg shadow-md" method="post" use:enhance on:submit={validate}>
      <div>
        <label for="username" class="block mb-2">Username:</label>
        <input type="text" id="username" name="username" required class="w-full p-2 border border-gray-300 rounded" />
        {#if errors.username}
					<p class="text-red-500 text-sm mt-1">{errors.username}</p>
				{/if}
      </div>
      <div>
        <label for="password" class="block mb-2">Password:</label>
        <input type="password" id="password" name="password" required class="w-full p-2 border border-gray-300 rounded" />
        {#if errors.password}
					<p class="text-red-500 text-sm mt-1">{errors.password}</p>
				{/if}
      </div>
      <button type="submit" class="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Login</button>
    </form>
  </main>
  
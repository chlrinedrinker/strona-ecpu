<script lang="ts">
    import { goto } from '$app/navigation';
    import { isLoggedIn } from '../stores/stores';
    import LoginStatus from '../komponenty/LoginStatus.svelte';

    let username = '';
    let password = '';
    let error: string | null = null;

    let loggedIn
    
    function login() {
      isLoggedIn.set(true);
    }

    async function handleSubmit(event: Event) {
      event.preventDefault();
      error = null;
  
      try {
        const response = await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });
  
        const result = await response.json();

        if (result.success) {
          // Przekierowanie na nową stronę po zalogowaniu
          login()
          goto('../');
        } else {
          error = result.message;
        }
      } catch (err) {
        error = 'Wystąpił błąd podczas logowania';
      }
    }
  </script>
  
  <main class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <h1 class="text-2xl font-bold mb-4">Login</h1>
    <form class="flex flex-col gap-4 p-8 bg-white rounded-lg shadow-md" on:submit|preventDefault={handleSubmit}>
      <div>
        <label for="username" class="block mb-2">Username:</label>
        <input type="text" id="username" bind:value={username} required class="w-full p-2 border border-gray-300 rounded" />
      </div>
      <div>
        <label for="password" class="block mb-2">Password:</label>
        <input type="password" id="password" bind:value={password} required class="w-full p-2 border border-gray-300 rounded" />
      </div>
      <button type="submit" class="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Login</button>
      {#if error}
        <p class="text-red-500">{error}</p>
      {/if}
    </form>
  </main>

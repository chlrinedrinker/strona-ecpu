<!-- src/routes/login.svelte -->
<script lang="ts">
  import { username, password, error, handleSubmit } from './login';
</script>

<main class="flex flex-col items-center justify-center h-screen bg-gray-100">
  <h1 class="text-2xl font-bold mb-4">Login</h1>
  <form class="flex flex-col gap-4 p-8 bg-white rounded-lg shadow-md" on:submit|preventDefault={handleSubmit}>
    <div>
      <label for="username" class="block mb-2">Username:</label>
      <input type="text" id="username" bind:value={$username} required class="w-full p-2 border border-gray-300 rounded" />
    </div>
    <div>
      <label for="password" class="block mb-2">Password:</label>
      <input type="password" id="password" bind:value={$password} required class="w-full p-2 border border-gray-300 rounded" />
    </div>
    <button type="submit" class="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Login</button>
    {#if $error}
      <p class="text-red-500">{$error}</p>
    {/if}
  </form>
</main>

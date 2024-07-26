<!-- routes/signup/+page.svelte -->
<script lang="ts">
	import { enhance } from "$app/forms";
    import { onMount } from "svelte";
	import { isLoggedIn } from "../stores/stores";
</script>

<main class="flex flex-col items-center justify-center h-screen bg-gray-100">
	<h1 class="text-2xl font-bold mb-4">Rejestracja</h1>
	<form class="flex flex-col gap-4 p-8 bg-white rounded-lg shadow-md" method="post" use:enhance>
		<div>
			<label for="imie" class="block mb-2">Imie:</label>
			<input type="text" id="imie" name="imie" required class="w-full p-2 border border-gray-300 rounded" />
		</div>
		<div>
			<label for="nazwisko" class="block mb-2">Nazwisko:</label>
			<input type="text" id="nazwisko" name="nazwisko" required class="w-full p-2 border border-gray-300 rounded" />
	  </div>
	  	<label for="ranga">Wybierz typ uytkownika</label>
	  	<select name="ranga" id="ranga" required>
			<option value=0>Administrator</option>
			<option value=1>boss</option>
			<option value=2>Użytkownik</option>
		</select>
		<div>
			<label for="stanowisko" class="block mb-2">Stanowisko:</label>
			<input type="text" name="stanowisko" id="stanowisko" class="w-full p-2 border border-gray-300 rounded">
		</div>
	  <div>
		<label for="cardID" class="block mb-2">Kod Karty:</label>
		<input type="text" id="cardID" name="cardID" class="w-full p-2 border border-gray-300 rounded" />
	  </div>
	  <div>
		<label for="fingerID" class="block mb-2">Kod Odcisku Palca:</label>
		<input type="text" id="fingerID" name="fingerID" class="w-full p-2 border border-gray-300 rounded" />
	  </div>
	  <div>
		<label for="username" class="block mb-2">Nazwa użytkownika:</label>
		<input type="text" id="username" name="username" required class="w-full p-2 border border-gray-300 rounded" />
	  </div>
	  <div>
		<label for="password" class="block mb-2">Hasło:</label>
		<input type="password" id="password" name="password" required class="w-full p-2 border border-gray-300 rounded" />
	  </div>
	  <button type="submit" class="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Login</button>
	</form>
  </main>
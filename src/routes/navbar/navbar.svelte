<script>
  import { enhance } from "$app/forms"; // SvelteKit form enhancement
  import { isLoggedIn, userType } from "../stores/stores"; // Store for login state
  const logged = isLoggedIn; // Get the login state

  // Zmienna stanu do przechowywania stanu rozwinięcia menu
  let isDropdownOpen = false;

  // Funkcja zmieniająca stan isDropdownOpen
  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }
</script>

<div
  class="flex items-center justify-between p-2 md:p-4 bg-gray-100 border-b z-100 w-full"
>
  <div class="flex items-center space-x-2 md:space-x-4">
    <a href="/">
      <img src="/herb.png" alt="Logo" class="h-6 w-6 sm:h-8 sm:w-8 md:w-11 md:h-12" />
    </a>
    <a href="/">
      <div class="text-sm sm:text-base md:text-lg">Gmina Łubnice</div>
    </a>
  </div>
  {#if $logged}
    <div class="flex items-center space-x-2 md:space-x-4 relative">
      <!-- Hamburger Menu Button for Small Screens -->
      <button
        class="md:hidden block px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded"
        on:click={toggleDropdown}
      >
      <svg class="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
      </button>

      <!-- Dropdown menu for small screens -->
      {#if isDropdownOpen}
        <div
          class="absolute top-full right-0 w-36 sm:w-48 bg-white shadow-lg rounded mt-2 py-1 sm:py-2 flex flex-col items-stretch space-y-1 sm:space-y-2"
        >
          <a href="/zmianaHaslaIndiwidualna">
            <button
              class="w-full px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded text-left"
            >
              Zmień Hasło
            </button>
          </a>
          <form method="post" use:enhance action="?/wyloguj">
          </form>
          {#if $userType == 0}
          <a
          href="zmianaHasel"
              class="w-full px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded text-left"
            >
              Panel Administracyjny
            </a>
            <a
            href="/signup"
            class="w-full px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded text-left"
            >
            Zarejestruj użytkownika
          </a>
          {/if}
          <button
            class="w-full px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded text-left"
          >
            Wyloguj się
          </button>
        </div>
      {/if}

      <!-- Optional Profile Image -->
      <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-300 hidden lg:block">
        <img src="user.png" alt="User" class="w-full h-full rounded-full"/>
      </div>
    </div>
  {/if}
</div>

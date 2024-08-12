<script>
  import { enhance } from "$app/forms"; // SvelteKit form enhancement
  import { isLoggedIn, userType } from "../stores/stores"; // Store for login state
  import { onMount } from "svelte";
  const logged = isLoggedIn; // Get the login state

  let isDropdownOpen = false; // State for dropdown
  let isMobileView = false; // State for checking if mobile view

  // Function to check screen size
  function checkScreenSize() {
    isMobileView = window.innerWidth < 768; // 'md' is 768px in Tailwind
  }

  // Check screen size on component mount
  onMount(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  });

  // Toggle dropdown state
  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }

  // Close the dropdown
  function closeDropdown() {
    isDropdownOpen = false;
  }
</script>

<div
  class="flex items-center justify-between p-2 md:p-4 bg-gray-100 border-b z-100 w-full"
>
  <div class="flex items-center space-x-2 md:space-x-4">
    <a href="/">
      <img
        src="/herb.png"
        alt="Logo"
        class="h-6 w-5.5 sm:h-8 sm:w-8 md:w-11 md:h-12"
      />
    </a>
    <a href="/">
      <div class="text-sm sm:text-base md:text-lg">Gmina Łubnice</div>
    </a>
  </div>
  {#if $logged}
    <div class="flex items-center space-x-2 md:space-x-4 relative">
      <!-- Hamburger Menu Button for Small Screens -->
      {#if isMobileView}
        <button
          class="md:hidden block px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded"
          on:click={toggleDropdown}
        >
          <svg
            class="w-4 h-4 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        <!-- Dropdown menu for small screens -->
        {#if isDropdownOpen}
          <div class="fixed inset-0 z-10 overflow-auto bg-black/40">
            <div
              class="bg-white my-5 mx-2 p-5 border border-gray-400 w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg"
            >
              <button on:click={closeDropdown}>
                <span
                  class="text-gray-400 float-right text-2xl font-bold hover:text-black hover:no-underline focus:text-black focus:no-underline cursor-pointer"
                  >&times;</span
                >
              </button>

              <a href="/zmianaHaslaIndiwidualna"
                ><button on:click={closeDropdown}
                  class="w-full px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded text-left mb-2"
                  >Zmień Hasło
                </button></a
              >

              {#if $userType == 0}
                <a href="/zmianaHasel">
                  <button on:click={closeDropdown}
                    class="w-full px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded text-left mb-2"
                  >
                    Panel Administracyjny
                  </button>
                </a>

                <a href="/signup">
                  <button on:click={closeDropdown}
                    class="w-full px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded text-left mb-2"
                  >
                    Zarejestruj użytkownika
                  </button>
                </a>
              {/if}
              <form method="post" use:enhance action="?/wyloguj" on:submit={closeDropdown}>
                <button
                  type="submit"
                  class="w-full px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded text-left mb-2"
                >
                  Wyloguj się
                </button>
              </form>
            </div>
          </div>
        {/if}
      {:else}
        <!-- Buttons for larger screens -->
        <button
          class="px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded"
        >
          <a href="/zmianaHaslaIndiwidualna">Zmień Hasło</a>
        </button>

        {#if $userType == 0}
          <button
            class="px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded"
          >
            <a href="/zmianaHasel">Panel Administracyjny</a>
          </button>
          <button
            class="px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded"
          >
            <a href="/signup">Zarejestruj użytkownika</a>
          </button>
        {/if}
        <form method="post" use:enhance action="?/wyloguj">
          <button
            type="submit"
            class="px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded"
            >Wyloguj się</button
          >
        </form>
      {/if}

      <!-- Optional Profile Image -->
      <div
        class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-300 hidden lg:block"
      >
        <img src="user.png" alt="User" class="w-full h-full rounded-full" />
      </div>
    </div>
  {/if}
</div>

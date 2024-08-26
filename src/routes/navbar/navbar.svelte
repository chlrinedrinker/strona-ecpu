<script>
  import { enhance } from "$app/forms"; 
  import { isLoggedIn, userType } from "../stores/stores"; 
  import { t, loadLanguage } from '../../i18n.js'; 
  import { onMount } from "svelte";

  let currentLanguage = 'pl'; 
  let isDropdownOpen = false; 
  let isMobileView = false; 

  const logged = isLoggedIn; 

  function checkScreenSize() {
    isMobileView = window.innerWidth < 768; 
  }

  onMount(() => {
    checkScreenSize();
    const savedLanguage = localStorage.getItem('language') || 'pl';
    loadLanguage(savedLanguage);
    currentLanguage = savedLanguage;

    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  });

  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }

  function closeDropdown() {
    isDropdownOpen = false;
  }

  function handleOutsideClick(event) {
    if (event.target.closest('.dropdown-content') === null) {
      closeDropdown();
    }
  }

  function switchLanguage() {
    const newLanguage = currentLanguage === 'pl' ? 'en' : 'pl';
    loadLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    currentLanguage = newLanguage;
    location.reload(); 
  }
</script>

<div class="flex items-center justify-between p-2 md:p-4 bg-gray-100 border-b z-100 w-full">
  <div class="flex items-center space-x-2 md:space-x-4">
    <a href="/">
      <img src="/herb.png" alt="Logo" class="h-6 w-5.5 sm:h-8 sm:w-8 md:w-11 md:h-12" />
    </a>
    <a href="/">
      <div class="text-sm sm:text-base md:text-lg">Gmina Łubnice</div>
    </a>
  </div>

  
  <div class="flex items-center space-x-2 md:space-x-4 relative">
    <!-- Language Switcher -->
  <div class="flex space-x-2 right">
    <button on:click={switchLanguage} class="w-full px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded text-left ">
      {currentLanguage.toUpperCase()}
    </button>
  </div>
  {#if $logged}
    
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

        {#if isDropdownOpen}
          <div class="fixed inset-0 z-10 overflow-auto" on:click={handleOutsideClick}>
            <div
              class="bg-white my-5 p-5 border border-gray-400 w-auto right-0 absolute mr-4 rounded-lg dropdown-content"
            >
              <button on:click={closeDropdown}>
                <span
                  class="text-gray-400 float-right text-2xl font-bold hover:text-black hover:no-underline focus:text-black focus:no-underline cursor-pointer"
                  >&times;</span
                >
              </button>

              <a href="/zmianaHaslaIndiwidualna"
                ><button
                  on:click={closeDropdown}
                  class="w-full px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded text-left mb-2"
                  >{t('change_password')}
                </button></a
              >

              {#if $userType == 0}
                <a href="/zmianaHasel">
                  <button
                    on:click={closeDropdown}
                    class="w-full px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded text-left mb-2"
                  >
                    {t('admin_panel')}
                  </button>
                </a>

                <a href="/signup">
                  <button
                    on:click={closeDropdown}
                    class="w-full px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded text-left mb-2"
                  >
                    {t('register_user')}
                  </button>
                </a>
              {/if}
              <form
                method="post"
                use:enhance
                action="?/wyloguj"
                on:submit={closeDropdown}
              >
                <button
                  type="submit"
                  class="w-full px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded text-left mb-2"
                >
                  {t('logout')}
                </button>
              </form>
            </div>
          </div>
        {/if}
      {:else}
        <button class="px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded">
          <a href="/zmianaHaslaIndiwidualna">{t('change_password')}</a>
        </button>

        {#if $userType == 0}
          <button class="px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded">
            <a href="/zmianaHasel">{t('admin_panel')}</a>
          </button>
          <button class="px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded">
            <a href="/signup">{t('register_user')}</a>
          </button>
        {/if}
        <form method="post" use:enhance action="?/wyloguj">
          <button
            type="submit"
            class="px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded"
            >{t('logout')}</button>
        </form>
      {/if}

      <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-300 hidden lg:block">
        <img src="user.png" alt="User" class="w-full h-full rounded-full" />
      </div>
    
  {/if}
</div>
</div>

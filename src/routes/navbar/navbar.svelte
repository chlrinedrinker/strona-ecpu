<script lang="ts">
  import { enhance } from "$app/forms"; 
  import { pracownicyStore, isLoggedIn, userType, totalHours } from "../stores/stores"; 
  import { t, loadLanguage } from '../../i18n.js'; 
  import { onMount, onDestroy } from "svelte";

  interface Pracownik {
    imie: string;
    nazwisko: string;
    stanowisko: string;
    totalHours: string;
  }

  let pracownicy: Pracownik[] = [];
  let hoursData: Record<string, string> = {}; // Typ Record dla obiektu z godzinami
  let currentLanguage = 'pl'; 
  let isDropdownOpen = false; 
  let isMobileView = false; 
  let time_set: 'month' | 'week' | null = null; // Zmienna dla ustawienia czasu
  let isModalVisible = false; // Stan dla widoczności modalnego okienka
  const logged = isLoggedIn; 

  // Subscribe to the store

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

  function toggleModal() {
    isModalVisible = !isModalVisible;
    if (isModalVisible) fetchHoursForAllUsers(); // Fetch hours data when modal opens
  }

  function closeModal() {
    isModalVisible = false;
  }

  function setToCurrentMonth() {
    time_set = 'month';
  }

  function setToCurrentWeek() {
    time_set = 'week';
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

  async function fetchHoursForAllUsers() {
    if (!time_set) return; // Do not fetch if time_set is not set
      const response = await fetch(`/endpoints/user-hours?&period=${time_set}`);
      const data = await response.json();
      pracownicy = data
      console.log(pracownicy)
  }

  $: time_set, fetchHoursForAllUsers();
</script>

<div class="flex items-center justify-between p-2 md:p-4 bg-gray-100 border-b z-100 w-full">
  <div class="flex items-center space-x-2 md:space-x-4">
    <a href="/">
      <img src="/herb.webp" alt="Logo" class="h-6 w-5.5 sm:h-8 sm:w-8 md:w-11 md:h-12" />
    </a>
    <a href="/">
      <div class="text-sm sm:text-base md:text-lg">Gmina Łubnice</div>
    </a>
  </div>

  <div class="flex items-center space-x-2 md:space-x-4 relative">
    <div class="flex space-x-2 right">
      <button on:click={switchLanguage} class="w-full px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded text-left">
        {currentLanguage.toUpperCase()}
      </button>
    </div>
    {#if $logged}
      {#if isMobileView}
        <button class="md:hidden block px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded" on:click={toggleDropdown}>
          <svg class="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        <!-- svelte-ignore a11y-no-static-element-interactions -->
        {#if isDropdownOpen}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div class="fixed inset-0 z-10 overflow-auto" on:click={handleOutsideClick}>
            <div class="bg-white my-5 p-5 border border-gray-400 w-auto right-0 absolute mr-4 rounded-lg dropdown-content">
              <button on:click={closeDropdown}>
                <span class="text-gray-400 float-right text-2xl font-bold hover:text-black hover:no-underline focus:text-black focus:no-underline cursor-pointer">&times;</span>
              </button>

              <a href="/zmianaHaslaIndiwidualna">
                <button on:click={closeDropdown} class="w-full px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded text-left mb-2">{t('change_password')}</button>
              </a>

              {#if $userType == 0}
                <a href="/zmianaHasel">
                  <button on:click={closeDropdown} class="w-full px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded text-left mb-2">{t('admin_panel')}</button>
                </a>

                <a href="/signup">
                  <button on:click={closeDropdown} class="w-full px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded text-left mb-2">{t('register_user')}</button>
                </a>
              {/if}
              <form method="post" use:enhance action="?/wyloguj" on:submit={closeDropdown}>
                <button type="submit" class="w-full px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded text-left mb-2">{t('logout')}</button>
              </form>
            </div>
          </div>
        {/if}
      {:else}
        <button class="px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded" on:click={toggleModal}>{t('generate_report')}</button>
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
          <button type="submit" class="px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded">{t('logout')}</button>
        </form>
      {/if}

      <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-300 hidden lg:block">
        <img src="user.png" alt="User" class="w-full h-full rounded-full" />
      </div>
    {/if}
  </div>
</div>

<!-- Modalne okienko z listą użytkowników -->
 {#if $userType != 2}
{#if isModalVisible}
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-white p-4 rounded-lg w-11/12 md:w-1/2 max-w-4xl max-h-[80vh] overflow-y-auto">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">{t('generate_report')}</h2>
        <button on:click={closeModal} class="text-gray-600 hover:text-gray-800 text-2xl">&times;</button>
      </div>

      <div class="mb-4">
        <button on:click={setToCurrentMonth} class="px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded mr-2">
          {t('month')}
        </button>
        <button on:click={setToCurrentWeek} class="px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded">
          {t('week')}
        </button>
      </div>

      <!-- Employee Hours Table -->
       {#await pracownicy}
        <h2 class="text-xl font-bold">Raport Jest w Trakcie Tworzenia</h2>
       {:then pracownicy} 
       <div class="overflow-x-auto">
         <table class="min-w-full bg-white border border-gray-300">
           <thead>
             <tr class="bg-gray-100 border-b">
               <th class="py-2 px-4 text-left text-gray-600 font-semibold">{t('first_name')}</th>
               <th class="py-2 px-4 text-left text-gray-600 font-semibold">{t('last_name')}</th>
               <th class="py-2 px-4 text-left text-gray-600 font-semibold">{t('position')}</th>
               <th class="py-2 px-4 text-left text-gray-600 font-semibold">{t('hours')}</th>
             </tr>
           </thead>
           <tbody>
             {#each pracownicy as pracownik}
               <tr class="border-b hover:bg-gray-50">
                 <td class="py-2 px-4">{pracownik.imie}</td>
                 <td class="py-2 px-4">{pracownik.nazwisko}</td>
                 <td class="py-2 px-4">{pracownik.stanowisko}</td>
                 <td class="py-2 px-4">{pracownik.totalHours}</td>
               </tr>
             {/each}
           </tbody>
         </table>
       </div>
       {:catch}
       <h2 class="text-xl font-bold">Błąd przy tworzeniu raportu</h2>
       {/await}
    </div>
  </div>
{/if}
{/if}


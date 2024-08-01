<script>
  import { enhance } from "$app/forms"; // SvelteKit form enhancement
  import { isLoggedIn, userType } from "../stores/stores"; // Store for login state
  const logged = isLoggedIn // Get the login state
  let isDropdownOpen = false
  const handleDropdownClick = () => {
    isDropdownOpen = !isDropdownOpen // togle state on click
  }

  const handleDropdownFocusLoss = ({ relatedTarget, currentTarget }) => {
    // use "focusout" event to ensure that we can close the dropdown when clicking outside or when we leave the dropdown with the "Tab" button
    if (relatedTarget instanceof HTMLElement && currentTarget.contains(relatedTarget)) return // check if the new focus target doesn't present in the dropdown tree (exclude ul\li padding area because relatedTarget, in this case, will be null) 
    isDropdownOpen = false
  }
  </script>


<div class="flex items-center justify-between p-4 bg-gray-100 border-b">
  <div class="flex items-center space-x-4">
    <a href="/">
      <img src="/herb.png" alt="Logo" class="h-8">
    </a>
    <a href="/">
      <div>Gmina Łubnice</div>
    </a>
    
  </div>
  {#if $logged}
  <div class="flex items-center space-x-4">
    <button class="btn">Organizacja</button>
    <button class="btn">Raporty</button>
    <div class="flex items-center space-x-2">
      <form method="post" use:enhance action="?/wyloguj">
        <button class="btn">Wyloguj się</button>  
      </form>
      {#if $userType == 0}
        <div class="dropdown" on:focus={handleDropdownFocusLoss}>
          <button class="btn m-1" on:click={handleDropdownClick}>
              <h1>Panel Administracyjny</h1>
          </button>
          <ul class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52" style:visibility={isDropdownOpen ? 'visible' : 'hidden'}>
            <li><button class="btn text-slate-300">Item 1</button></li>
            <li><button class="btn text-slate-300">Item 2</button></li>
          </ul>
        </div>
      <a href="/signup"><button class="btn">Zarejestruj użytkownika</button></a>
      {/if}
    </div>
    <div class="w-10 h-10 rounded-full bg-gray-300"><img src="user.png" alt="User"></div>
  </div>
  {/if}
</div>


<style>
  .btn {
    @apply px-4 py-2 bg-blue-500 text-white rounded;
  }
</style>

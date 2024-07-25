<script>
  import { enhance } from "$app/forms";
  import { isLoggedIn } from "../stores/stores";

  const logged = isLoggedIn
  console.log(logged)
</script>


    <div class="flex items-center justify-between p-4 bg-gray-100 border-b">
      <div class="flex items-center space-x-4">
        <img src="/herb.png" alt="Logo" class="h-8">
        <div>Gmina Łubnice</div>
      </div>
      {#if $logged}
      <div class="flex items-center space-x-4">
        <button class="btn">Organizacja</button>
        <button class="btn">Kalendarz</button>
        <button class="btn">Raporty</button>
        <div class="flex items-center space-x-2">
          <form method="post" use:enhance>
            <button class="btn">Wyloguj się</button>
          </form>
         <a href="/signup"> <button class="btn">Zarejestruj użytkownika</button></a>
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
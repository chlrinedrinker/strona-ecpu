<script lang="ts">

    import { enhance } from "$app/forms";
    export let selectedUser;
    interface Pracownik {
    _id: string;
    imie: string;
    nazwisko: string;
    stanowisko: string;
  }

</script>

<div class="p-4">
    <h1 class="text-lg font-semibold">Panel Administratora</h1>
    <h2 class="mb-4">Wybrano: <span class="underline decoration-2 decoration-sky-600">{selectedUser.imie} {selectedUser.nazwisko}</span></h2>
    <div class="mb-4">
      <form 
                action="?/zmianaDanychUżytkownika" 
                method="post"
                use:enhance={({formData}) => {
                  formData.append("imie", selectedUser.imie)
                  formData.append("nazwisko", selectedUser.nazwisko)
          }}>
          <label for="zmianaLogin" class="mb-2">Zmiana Login</label><br>
          <input type="text" name="zmianaLogin" id="zmianaLogin" class="mb-2" placeholder="{selectedUser.imie}"><br>
          <label for="zmianaHasła" class="mb-2">Zmiana Hasła</label><br>
          <input type="password" name="zmianaHasło" id="zmianaHasło" class="mb-2" placeholder="********"><br>
          <label for="zmianaStanowiska" class="mb-2">Zmiana Stanowiska</label><br>
          <input type="text" name="zmianiaStanowiska" id="zmianiaStanowiska" class="mb-2" placeholder="{selectedUser.stanowisko}"><br>
          <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Zmień Dane</button><br>
          <select name="zmianaRanga" id="zmianaRanga" class="w-full p-2 border border-gray-300 rounded">
            <option value="">Brak Zmian</option>
            <option value="0">Administrator</option>
            <option value="1">Boss</option>
            <option value="2">Użytkownik</option>
        </select>
      </form>
  </div>
</div>

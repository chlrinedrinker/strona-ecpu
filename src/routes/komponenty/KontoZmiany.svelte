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

<div>
    <form class="flex items-center" 
              action="?/zmianaDanychUżytkownika" 
              method="post"
              use:enhance={({formData}) => {
                formData.append("imie", selectedUser.imie)
                formData.append("nazwisko", selectedUser.nazwisko)
        }}>
        <label for="zmianaNazwiska">Zmiana Login</label>
        <input type="text" name="zmianaLogin" id="zmianaLogin">
        <label for="zmianaHasła">Zmiana Hasła</label>
        <input type="text" name="zmianaHasło" id="zmianaHasło">
        <label for="zmianaStanowiska">Zmiana Stanowiska</label>
        <input type="text" name="zmianiaStanowiska" id="zmianiaStanowiska">
        <button type="submit">Zmień Dane</button>
    </form>
</div>

<style>

</style>
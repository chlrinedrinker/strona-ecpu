<script lang="ts">
    import { enhance } from "$app/forms";
    import type { ActionData } from "../$types";
    import Modal from "../komponenty/Modal.svelte";
    export let selectedUser;

    let showModal = false;
    interface Pracownik {
        _id: string;
        imie: string;
        nazwisko: string;
        stanowisko: string;
    }
</script>

<div class="p-4 bg-white rounded-lg w-full max-w-md">
    <h2 class="mb-4">
        Wybrano: <span class="underline decoration-2 decoration-sky-600"
        >{selectedUser.imie} {selectedUser.nazwisko}</span
        >
    </h2>
    <form
        action="?/zmianaDanychUżytkownika"
        method="post"
        use:enhance={({ formData }) => {
            formData.append("imie", selectedUser.imie);
            formData.append("nazwisko", selectedUser.nazwisko);
        }}
    >
    <div class="grid grid-cols-2 gap-4">
        <div>
            <label for="zmianaLogin" class="block mb-2">Zmiana Login</label>
            <input
                type="text"
                name="zmianaLogin"
                id="zmianaLogin"
                class="w-full mb-4 p-2 border border-gray-300 rounded"
                placeholder={selectedUser.imie}
            />
        </div>
        <div>
            <label for="zmianaHasła" class="block mb-2">Zmiana Hasła</label>
            <input
                type="password"
                name="zmianaHasła"
                id="zmianaHasła"
                class="w-full mb-4 p-2 border border-gray-300 rounded"
                placeholder="********"
            />
        </div>
        <div>
            <label for="zmianaStanowiska" class="block mb-2"
                >Zmiana Stanowiska</label
            >
            <input
                type="text"
                name="zmianaStanowiska"
                id="zmianaStanowiska"
                class="w-full mb-4 p-2 border border-gray-300 rounded"
                placeholder={selectedUser.stanowisko}
            />
        </div>
        <div>
            <label for="zmianaRanga" class="block mb-2">Zmiana Ranga</label>
            <select
                name="zmianaRanga"
                id="zmianaRanga"
                class="w-full p-2 border border-gray-300 rounded"
            >
                <option value="">Brak Zmian</option>
                <option value="0">Administrator</option>
                <option value="1">Boss</option>
                <option value="2">Użytkownik</option>
            </select>
        </div>
        <div>
            <label for="zmianaKarty" class="block mb-2">Zmiana Numeru Karty</label>
            <input
                type="text"
                name="zmianaKarty"
                id="zmianaKarty"
                class="w-full mb-4 p-2 border border-gray-300 rounded"
            />
        </div>
        <div>
            <label for="zmianaKoduKarty" class="block mb-2">Zmiana Numeru Palca</label>
            <input
                type="text"
                name="zmianaKoduKarty"
                id="zmianaKoduKarty"
                class="w-full mb-4 p-2 border border-gray-300 rounded"
            />
        </div>
        <div>
            <label for="zmianaImienia" class="block mb-2">Zmiana Imienia</label>
            <input
                type="text"
                name="zmianaImienia"
                id="zmianaImienia"
                class="w-full mb-4 p-2 border border-gray-300 rounded"
                placeholder={selectedUser.imie}
            />
        </div>
        <div>
            <label for="zmianaNazwiska" class="block mb-2">Zmiana Nazwiska</label>
            <input
                type="text"
                name="zmianaNazwiska"
                id="zmianaNazwiska"
                class="w-full mb-4 p-2 border border-gray-300 rounded"
                placeholder={selectedUser.nazwisko}
            />
        </div>

    </div>
        <div class="flex justify-between mt-4">
            <button
                type="submit"
                class="px-4 py-2 bg-blue-500 text-white rounded"
                >Zmień Dane</button
            >
            <button
                type="button"
                class="px-4 py-2 bg-red-500 text-white rounded"
                on:click={() => (showModal = true)}>Usuń Użytkownika</button
            >
        </div>
    </form>
    <Modal bind:showModal>
        <h1>Czy na pewno chcesz usunąć użytkownika?</h1>
        <form
            action="?/Delete"
            method="post"
            use:enhance={({ formData }) => {
                formData.append("imie", selectedUser.imie);
                formData.append("nazwisko", selectedUser.nazwisko);
            }}
            on:submit={() => setTimeout(() => window.location.reload(), 1000)}
        >
            <button
                type="submit"
                class="px-4 py-2 bg-red-500 text-white rounded my-2">Tak</button
            >
        </form>
    </Modal>
</div>

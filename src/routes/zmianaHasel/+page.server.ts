import { redirect, fail } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "../$types";
import { lucia } from "$lib/server/auth";
import { hash } from "@node-rs/argon2";
import { _login, _czas_pracy, _pracownicy } from "$db/mongo";
interface Pracownik {
  _id: string;
  imie: string;
  nazwisko: string;
  stanowisko: string;
}

export const load: PageServerLoad = async (event) => {
  if (!event.locals.user) {
    throw redirect(308, "/login");
  }
  let error;
  let pracownicy: Pracownik[] = [];
  try {
    const response = await event.fetch("/endpoints/ImieNazStanow");
    if (response.ok) {
      pracownicy = await response.json();
    } else {
      error = "Błąd Użytkowników";
    }
  } catch (err) {
    error = "Error loading employees"; // Set error message if an exception occurs
  }
  return {
    pracownicy: pracownicy,
  };
};

export const actions: Actions = {
  wyloguj: async (event) => {
    if (!event.locals.user) {
      throw fail(401);
    }
    await lucia.invalidateSession(event.locals.session!.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });
    return redirect(302, "/login");
  },
  zmianaDanychUżytkownika: async (event) => {
    const data = await event.request.formData();
    const zmianaLogin = data.get("zmianaLogin");
    const zmianaHasła = data.get("zmianaHasło");
    const zmianaRanga = data.get("zmianaRanga");
    const zmianaStanowiska = data.get("zmianaStanowiska");
    const zmianaImie = data.get("zmianaImienia")
    const zmianaNazwisko = data.get("zmianaNazwiska")
    const zmianaKarta = data.get("zmianaKoduKarty")
    const zmianaPalec = data.get("zmianaKarty")
    const wybranyImie = data.get("imie");
    const wybranyNazwisko = data.get("nazwisko");
    const name = wybranyImie!.toString() + "_" + wybranyNazwisko!.toString();
    const response_loginy = await event.fetch("/endpoints/SpawdzanieUnikalnych/UnikalneLoginy")
    const response_name = await event.fetch("/endpoints/SpawdzanieUnikalnych/UnikalneNazwy")
    let unikalneLoginy= [];
    let unikalneName = [];
    if((await response_loginy).ok){
      unikalneLoginy = await response_loginy.json()
    }
    if((await response_name).ok){
      unikalneName = await response_name.json()
    }
    console.log(unikalneLoginy)
    console.log(unikalneName)

    console.log(name)
    let zmianaUSERS: { [key: string]: string } = {};
    let zmianaPracownicyID: { [key: string]: string} = {}
    let wyborZmianyImieniaNazwiska = {
      imie: wybranyImie,
      nazwisko: wybranyNazwisko, 
    }
    if (zmianaLogin != "" && zmianaLogin != null) {
      if (
        typeof zmianaLogin !== "string" ||
        unikalneLoginy.some(item => item.username == zmianaLogin) ||
        zmianaLogin.length < 3 ||
        zmianaLogin.length > 31 ||
        !/^[a-zA-Z0-9_-]+$/.test(zmianaLogin)
      ) {
        return fail(400, {
          message: "Niepoprawny login",
        });
      }
      zmianaUSERS["username"] = zmianaLogin.toString();
    }
    if (zmianaHasła != "" && zmianaHasła != null) {
      if (
        
        typeof zmianaHasła !== "string" ||
        zmianaHasła.length < 6 ||
        zmianaHasła.length > 255
      ) {
        return fail(400, {
          message: "Niepoprawne haslo",
        });
      }
      zmianaUSERS["hash_password"] = await hash(zmianaHasła.toString(), {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
      });
    }
    if (zmianaRanga != "" && zmianaRanga != null) {
      zmianaUSERS["role"] = zmianaRanga.toString();
    }
    
    if (zmianaImie != "" && zmianaImie != null){
      if (typeof zmianaImie !== "string" || !/^[a-zA-Z]+$/.test(zmianaImie)) {
        return fail(400, {
          message: "Niepoprawne imie",
        });
      }
      wyborZmianyImieniaNazwiska.imie = zmianaImie
      zmianaPracownicyID["imie"] = zmianaImie
    } 
    
    if (zmianaNazwisko != "" && zmianaNazwisko != null){
      if (typeof zmianaNazwisko !== "string" || !/^[a-zA-Z]+$/.test(zmianaNazwisko)) {
        return fail(400, {
          message: "Niepoprawne nazwisko",
        });
      }
      wyborZmianyImieniaNazwiska.nazwisko = zmianaNazwisko
      zmianaPracownicyID["nazwisko"] = zmianaNazwisko
    }
    if(wyborZmianyImieniaNazwiska.nazwisko !== wybranyNazwisko || wyborZmianyImieniaNazwiska.imie !== wybranyImie){
      const zmianaName = wyborZmianyImieniaNazwiska.imie + "_" + wyborZmianyImieniaNazwiska.nazwisko
      _czas_pracy.collection(name).rename(zmianaName)
      zmianaUSERS["name"] = zmianaName
    }
    if (zmianaKarta != "" && zmianaKarta != null){
      if (typeof zmianaKarta !== "string" || !/^[a-zA-Z0-9]+$/.test(zmianaKarta)) {
        return fail(400, {
          message: "Niepoprawny kod karty",
        });
      }
      zmianaPracownicyID["cardID"] = zmianaKarta
    }
    if (zmianaStanowiska != "" && zmianaStanowiska != null){
      if (typeof zmianaStanowiska !== "string" || !/^[a-zA-Z0-9]+$/.test(zmianaStanowiska)) {
        return fail(400, {
          message: "Niepoprawny kod karty",
        });
      }
      zmianaPracownicyID["stanowisko"] = zmianaStanowiska
    }
    if (zmianaPalec != "" && zmianaPalec != null){
      if (typeof zmianaPalec !== "string" || !/^[a-zA-Z0-9]+$/.test(zmianaPalec)) {
        return fail(400, {
          message: "Niepoprawny kod palca",
        });
      }
      zmianaPracownicyID["FingerID"] = zmianaPalec
    }

    if (Object.keys(zmianaUSERS).length !== 0) {
      _login.collection("User").updateOne(
        { name: name },
        {
          $set: zmianaUSERS,
        },
      );
      console.log(zmianaUSERS)
    }
    if (Object.keys(zmianaPracownicyID).length !== 0) {
      const wpisDoBazyPracownicy = _pracownicy.collection("PracownicyID").updateOne(
        { imie: wybranyImie,
          nazwisko: wybranyNazwisko
        },
        {
          $set: zmianaPracownicyID,
        },
        {
          upsert: false,
        },
      );
    }
  },
  Delete: async (event) => {
    const data = await event.request.formData();
    const wybranyImie = data.get("imie");
    const wybranyNazwisko = data.get("nazwisko");
    const ImieNazwisko = wybranyImie + "_" + wybranyNazwisko;
    await _czas_pracy.dropCollection(ImieNazwisko);
    await _pracownicy
      .collection("PracownicyID")
      .deleteOne({ imie: wybranyImie, nazwisko: wybranyNazwisko });
    await _login.collection("User").deleteOne({ name: ImieNazwisko });
  },
};

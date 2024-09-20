import { r as redirect, f as fail } from "../../../chunks/index.js";
import { l as lucia } from "../../../chunks/auth.js";
import { hash } from "@node-rs/argon2";
import { c as client, _ as _login } from "../../../chunks/mongo.js";
const load = async (event) => {
  if (!event.locals.user) {
    throw redirect(308, "/login");
  }
  let error;
  let pracownicy = [];
  try {
    const response = await event.fetch("/endpoints/ImieNazStanow");
    if (response.ok) {
      pracownicy = await response.json();
    } else {
      error = "Błąd Użytkowników";
    }
  } catch (err) {
    error = "Error loading employees";
  }
  return {
    pracownicy
  };
};
const actions = {
  wyloguj: async (event) => {
    if (!event.locals.user) {
      throw fail(401);
    }
    await lucia.invalidateSession(event.locals.session.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    });
    return redirect(302, "/login");
  },
  zmianaDanychUżytkownika: async (event) => {
    const data = await event.request.formData();
    const zmianaLogin = data.get("zmianaLogin");
    const zmianaHasła = data.get("zmianaHasło");
    const zmianaRanga = data.get("zmianaRanga");
    const zmianaStanowiska = data.get("zmianaStanowiska");
    const zmianaImie = data.get("zmianaImienia");
    const zmianaNazwisko = data.get("zmianaNazwiska");
    const zmianaKarta = data.get("zmianaKoduKarty");
    const zmianaPalec = data.get("zmianaKarty");
    const wybranyImie = data.get("imie");
    const wybranyNazwisko = data.get("nazwisko");
    const name = wybranyImie.toString() + "_" + wybranyNazwisko.toString();
    const response_loginy = await event.fetch("/endpoints/SpawdzanieUnikalnych/UnikalneLoginy");
    const response_name = await event.fetch("/endpoints/SpawdzanieUnikalnych/UnikalneNazwy");
    let unikalneLoginy = [];
    if ((await response_loginy).ok) {
      unikalneLoginy = await response_loginy.json();
    }
    if ((await response_name).ok) {
      await response_name.json();
    }
    console.log(unikalneLoginy);
    console.log(name);
    let zmianaUSERS = {};
    let zmianaPracownicyID = {};
    let wyborZmianyImieniaNazwiska = {
      imie: wybranyImie,
      nazwisko: wybranyNazwisko
    };
    if (zmianaLogin != "" && zmianaLogin != null) {
      if (typeof zmianaLogin !== "string" || unikalneLoginy.some((item) => item.username == zmianaLogin) || zmianaLogin.length < 3 || zmianaLogin.length > 31 || !/^[a-zA-Z0-9_-]+$/.test(zmianaLogin)) {
        return fail(400, {
          message: "Niepoprawny login"
        });
      }
      zmianaUSERS["username"] = zmianaLogin.toString();
    }
    if (zmianaHasła != "" && zmianaHasła != null) {
      if (typeof zmianaHasła !== "string" || zmianaHasła.length < 6 || zmianaHasła.length > 255) {
        return fail(400, {
          message: "Niepoprawne haslo"
        });
      }
      zmianaUSERS["hash_password"] = await hash(zmianaHasła.toString(), {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
      });
    }
    if (zmianaRanga != "" && zmianaRanga != null) {
      zmianaUSERS["role"] = zmianaRanga.toString();
    }
    if (zmianaImie != "" && zmianaImie != null) {
      if (typeof zmianaImie !== "string" || !/^[a-zA-Z]+$/.test(zmianaImie)) {
        return fail(400, {
          message: "Niepoprawne imie"
        });
      }
      wyborZmianyImieniaNazwiska.imie = zmianaImie;
      zmianaPracownicyID["imie"] = zmianaImie;
    }
    if (zmianaNazwisko != "" && zmianaNazwisko != null) {
      if (typeof zmianaNazwisko !== "string" || !/^[a-zA-Z]+$/.test(zmianaNazwisko)) {
        return fail(400, {
          message: "Niepoprawne nazwisko"
        });
      }
      wyborZmianyImieniaNazwiska.nazwisko = zmianaNazwisko;
      zmianaPracownicyID["nazwisko"] = zmianaNazwisko;
    }
    if (wyborZmianyImieniaNazwiska.nazwisko !== wybranyNazwisko || wyborZmianyImieniaNazwiska.imie !== wybranyImie) {
      const zmianaName = wyborZmianyImieniaNazwiska.imie + "_" + wyborZmianyImieniaNazwiska.nazwisko;
      client.db(event.locals.session?.organization).collection(name).rename(zmianaName);
      zmianaUSERS["name"] = zmianaName;
    }
    if (zmianaKarta != "" && zmianaKarta != null) {
      if (typeof zmianaKarta !== "string" || !/^[a-zA-Z0-9]+$/.test(zmianaKarta)) {
        return fail(400, {
          message: "Niepoprawny kod karty"
        });
      }
      zmianaPracownicyID["cardID"] = zmianaKarta;
    }
    if (zmianaStanowiska != "" && zmianaStanowiska != null) {
      if (typeof zmianaStanowiska !== "string" || !/^[a-zA-Z0-9]+$/.test(zmianaStanowiska)) {
        return fail(400, {
          message: "Niepoprawny kod karty"
        });
      }
      zmianaPracownicyID["stanowisko"] = zmianaStanowiska;
    }
    if (zmianaPalec != "" && zmianaPalec != null) {
      if (typeof zmianaPalec !== "string" || !/^[a-zA-Z0-9]+$/.test(zmianaPalec)) {
        return fail(400, {
          message: "Niepoprawny kod palca"
        });
      }
      zmianaPracownicyID["FingerID"] = zmianaPalec;
    }
    if (Object.keys(zmianaUSERS).length !== 0) {
      _login.collection("User").updateOne(
        { name },
        {
          $set: zmianaUSERS
        }
      );
      console.log(zmianaUSERS);
    }
    if (Object.keys(zmianaPracownicyID).length !== 0) {
      client.db(event.locals.session?.organization).collection("PracownicyID").updateOne(
        {
          imie: wybranyImie,
          nazwisko: wybranyNazwisko
        },
        {
          $set: zmianaPracownicyID
        },
        {
          upsert: false
        }
      );
    }
  },
  Delete: async (event) => {
    const data = await event.request.formData();
    const wybranyImie = data.get("imie");
    const wybranyNazwisko = data.get("nazwisko");
    const ImieNazwisko = wybranyImie + "_" + wybranyNazwisko;
    await client.db(event.locals.session?.organization).dropCollection(ImieNazwisko);
    await client.db(event.locals.session?.organization).collection("PracownicyID").deleteOne({ imie: wybranyImie, nazwisko: wybranyNazwisko });
    await _login.collection("User").deleteOne({ name: ImieNazwisko });
  }
};
export {
  actions,
  load
};

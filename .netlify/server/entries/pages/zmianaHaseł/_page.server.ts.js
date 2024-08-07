import { r as redirect, f as fail } from "../../../chunks/index.js";
import { l as lucia } from "../../../chunks/auth.js";
import { hash } from "@node-rs/argon2";
import { b as _login, _ as _czas_pracy, a as _pracownicy } from "../../../chunks/mongo.js";
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
    data.get("zmianaStanowiska");
    const wybranyImie = data.get("imie");
    const wybranyNazwisko = data.get("nazwisko");
    const name = wybranyImie.toString() + "_" + wybranyNazwisko.toString();
    let zmianaUSERS = {};
    if (zmianaLogin != "" && zmianaLogin != null) {
      zmianaUSERS["username"] = zmianaLogin.toString();
    }
    if (zmianaHasła != "" && zmianaHasła != null) {
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
    if (Object.keys(zmianaUSERS).length !== 0) {
      _login.collection("User").updateOne(
        { name },
        {
          $set: zmianaUSERS
        },
        {
          upsert: true
        }
      );
    }
  },
  Delete: async (event) => {
    const data = await event.request.formData();
    const wybranyImie = data.get("imie");
    const wybranyNazwisko = data.get("nazwisko");
    const ImieNazwisko = wybranyImie + "_" + wybranyNazwisko;
    await _czas_pracy.dropCollection(ImieNazwisko);
    await _pracownicy.collection("PracownicyID").deleteOne({ "imie": wybranyImie, "nazwisko": wybranyNazwisko });
    await _login.collection("User").deleteOne({ "name": ImieNazwisko });
  }
};
export {
  actions,
  load
};

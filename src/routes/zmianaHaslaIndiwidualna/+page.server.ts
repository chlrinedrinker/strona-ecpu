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
  ZmianaHasła: async (event) => {
    const data = await event.request.formData();
    const password = data.get("password");
    const password_repeat = data.get("password_repeat");

    if (
      typeof password !== "string" ||
      password.length < 6 ||
      password.length > 255 ||
      typeof password_repeat !== "string" ||
      password_repeat.length < 6 ||
      password_repeat.length > 255
    ) {
      return fail(400, {
        message: "Niepoprawne haslo",
      });
    }
    if (password !== password_repeat) {
      return fail(400, {
        message: "Hasła nie są te same",
      });
    }
    console.log(event.locals.user!.username);
    console.log(password);
    console.log(password_repeat);

    _login.collection("User").updateOne(
      { username: event.locals.user!.username },
      {
        $set: {
          hash_password: await hash(password.toString(), {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1,
          }),
        },
      },
      {
        upsert: true,
      },
    );
  },
};

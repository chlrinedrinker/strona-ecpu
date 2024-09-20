import { r as redirect, f as fail } from "../../../chunks/index.js";
import { l as lucia } from "../../../chunks/auth.js";
import { hash } from "@node-rs/argon2";
import { _ as _login } from "../../../chunks/mongo.js";
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
  ZmianaHasła: async (event) => {
    const data = await event.request.formData();
    const password = data.get("password");
    const password_repeat = data.get("password_repeat");
    if (typeof password !== "string" || password.length < 6 || password.length > 255 || typeof password_repeat !== "string" || password_repeat.length < 6 || password_repeat.length > 255) {
      return fail(400, {
        message: "Niepoprawne haslo"
      });
    }
    if (password !== password_repeat) {
      return fail(400, {
        message: "Hasła nie są te same"
      });
    }
    console.log(event.locals.user.username);
    console.log(password);
    console.log(password_repeat);
    _login.collection("User").updateOne(
      { username: event.locals.user.username },
      {
        $set: {
          hash_password: await hash(password.toString(), {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
          })
        }
      },
      {
        upsert: true
      }
    );
  }
};
export {
  actions,
  load
};

import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import { generateIdFromEntropySize } from "lucia";
import { hash } from "@node-rs/argon2";
import type { Actions } from "./$types";
import { PrismaClient, Prisma } from "@prisma/client";
import { _pracownicy, _czas_pracy } from "$db/mongo";

export const actions: Actions = {
  signup: async (event) => {
    let prisma = new PrismaClient();
    try {
      const formData = await event.request.formData();
      const username = formData.get("username");
      const password = formData.get("password");
      const imie = formData.get("imie");
      const nazwisko = formData.get("nazwisko");
      const stanowisko = formData.get("stanowisko");
      const ranga = formData.get("ranga");
      const palec = formData.get("fingerID");
      const karta = formData.get("cardID");
      const name = `${imie}_${nazwisko}`;
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

      const insertIntoPracownicy = {
        cardID: karta,
        FingerID: palec,
        imie: imie,
        nazwisko: nazwisko,
        stanowisko: stanowisko,
      };
      console.log(insertIntoPracownicy)
      // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
      // keep in mind some database (e.g. mysql) are case insensitive
      if (
        typeof username !== "string" ||
        username.length < 3 ||
        username.length > 31 ||
        !/^[a-zA-Z0-9_-]+$/.test(username) ||
        unikalneLoginy.some(item => item.username == username)
      ) {
        return fail(400, {
          message: "Niepoprawny login",
        });
      }

      // Validate the password
      if (
        typeof password !== "string" ||
        password.length < 6 ||
        password.length > 255
      ) {
        return fail(400, {
          message: "Niepoprawne haslo",
        });
      }
      if (typeof imie !== "string" || !/[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ-]/.test(imie)) {
        return fail(400, {
          message: "Niepoprawne imie",
        });
      }
      if (typeof nazwisko !== "string" || !/[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ-]/.test(nazwisko)) {
        return fail(400, {
          message: "Niepoprawne nazwisko",
        });
      }
      if (typeof karta !== "string" || !/^[a-zA-Z0-9]+$/.test(karta)) {
        return fail(400, {
          message: "Niepoprawny kod karty",
        });
      }
      if (typeof palec !== "string" || !/^[a-zA-Z0-9]+$/.test(palec)) {
        return fail(400, {
          message: "Niepoprawny kod palca",
        });
      }
      if (unikalneName.some(item => item.name == name)){
        return fail(400, {
          message: "Użytkownik już jest w bazie danych"
        })
      }

      const userId = generateIdFromEntropySize(10); // 16 characters long
      const passwordHash = await hash(password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
      });
      const user = {
        id: userId,
        role: ranga,
        name: name,
        username: username,
        hash_password: passwordHash
      }
      console.log(user)
      // TODO: check if username is already used
      const User = await prisma.user.create({ data: user });
      _pracownicy.collection("PracownicyID").insertOne(insertIntoPracownicy);
      _czas_pracy.createCollection(name)
      console.log("Zarejestrowano użytkownika");

      // Użycie funkcji redirect, aby przekierować użytkownika na stronę z parametrem sukcesu
      return{
        success: true,
      }
    } catch (error) {
      console.error("Błąd serwera:", error);
      return fail(500, { message: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  },
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
};

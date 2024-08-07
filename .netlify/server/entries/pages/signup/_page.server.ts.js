import { l as lucia } from "../../../chunks/auth.js";
import { f as fail, r as redirect } from "../../../chunks/index.js";
import { generateIdFromEntropySize } from "lucia";
import { hash } from "@node-rs/argon2";
import { PrismaClient } from "@prisma/client";
import { a as _pracownicy } from "../../../chunks/mongo.js";
const actions = {
  default: async (event) => {
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
      const insertIntoPracownicy = {
        cardID: karta,
        FingerID: palec,
        imie,
        nazwisko,
        stanowisko
      };
      if (typeof username !== "string" || username.length < 3 || username.length > 31 || !/^[a-zA-Z0-9_-]+$/.test(username)) {
        return fail(400, {
          message: "Invalid username"
        });
      }
      if (typeof password !== "string" || password.length < 6 || password.length > 255) {
        return fail(400, {
          message: "Invalid password"
        });
      }
      if (typeof imie !== "string" || !/^[a-zA-Z]+$/.test(imie)) {
        return fail(400, {
          message: "Invalid imie"
        });
      }
      if (typeof nazwisko !== "string" || !/^[a-zA-Z]+$/.test(nazwisko)) {
        return fail(400, {
          message: "Invalid nazwisko"
        });
      }
      if (typeof karta !== "string" || !/^[a-zA-Z]+$/.test(karta)) {
        return fail(400, {
          message: "Invalid karta"
        });
      }
      if (typeof palec !== "string" || !/^[a-zA-Z]+$/.test(palec)) {
        return fail(400, {
          message: "Invalid palec"
        });
      }
      const userId = generateIdFromEntropySize(10);
      const passwordHash = await hash(password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
      });
      const User = await prisma.user.create({ data: user });
      console.log("Zarejestrowano użytkownika");
      const session = await lucia.createSession(userId, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes
      });
      _pracownicy.collection("PracownicyID").insertOne(insertIntoPracownicy);
      throw redirect(302, "/signup?success=true");
    } catch (error) {
      console.error("Błąd serwera:", error);
      return fail(500, { message: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  }
};
export {
  actions
};

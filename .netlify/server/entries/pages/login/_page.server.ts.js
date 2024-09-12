import { l as lucia } from "../../../chunks/auth.js";
import { r as redirect, f as fail } from "../../../chunks/index.js";
import { verify } from "@node-rs/argon2";
import { PrismaClient } from "@prisma/client";
let prisma = new PrismaClient();
let ranga = 3;
const load = async (event) => {
  if (event.locals.user) {
    throw redirect(308, "/");
  }
};
const actions = {
  // Define default action for login
  default: async (event) => {
    const formData = await event.request.formData();
    const username = formData.get("username");
    const password = formData.get("password");
    if (typeof username !== "string" || username.length < 3 || username.length > 31 || !/[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ-]/.test(username)) {
      return fail(400, {
        message: "Błędny Login"
      });
    }
    if (typeof password !== "string" || password.length < 6 || password.length > 255) {
      return fail(400, {
        message: "Hasło za krótkie"
      });
    }
    const existingUser = await prisma.user.findUnique({
      where: {
        username
      }
    });
    if (!existingUser) {
      return fail(400, {
        message: "Błędny login lub hasło"
      });
    }
    const validPassword = await verify(existingUser.hash_password, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1
    });
    if (!validPassword) {
      return fail(400, {
        message: "Incorrect username or password"
      });
    }
    ranga = Number(existingUser.role);
    const session = await lucia.createSession(existingUser.id, {
      ranga,
      imieNazwisko: existingUser.name
    });
    const sessionCookie = lucia.createSessionCookie(session.id);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    });
    redirect(302, "/");
  }
};
export {
  actions,
  load
};

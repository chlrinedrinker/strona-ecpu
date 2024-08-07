import { Lucia } from "lucia";
import { D as DEV } from "./prod-ssr.js";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";
const dev = DEV;
const client = new PrismaClient();
const adapter = new PrismaAdapter(client.session, client.user);
const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: !dev
    }
  },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      username: attributes.username
    };
  },
  getSessionAttributes: (attributes) => {
    return {
      ranga: attributes.ranga,
      imieNazwisko: attributes.imieNazwisko
    };
  }
});
export {
  lucia as l
};

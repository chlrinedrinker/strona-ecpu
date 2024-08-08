import { Lucia, TimeSpan } from "lucia";
import { dev } from "$app/environment";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";
import { imieNazwisko } from "../../routes/stores/stores";

const client = new PrismaClient();

const adapter = new PrismaAdapter(client.session, client.user); // your adapter

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: !dev,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      username: attributes.username,
    };
  },
  getSessionAttributes: (attributes) => {
    return {
      ranga: attributes.ranga,
      imieNazwisko: attributes.imieNazwisko,
    };
  },
  sessionExpiresIn: new TimeSpan(1, "h"),
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
    DatabaseSessionAttributes: DatabaseSessionAttributes;
  }
  interface DatabaseSessionAttributes {
    ranga: number;
    imieNazwisko: string;
  }
}

interface DatabaseUserAttributes {
  username: string;
}

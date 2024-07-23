// src/lib/server/auth.ts
import { Lucia } from "lucia";
import { dev } from "$app/environment";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import { Collection} from "mongodb";
import { _login } from "$db/mongo";

const db = _login
const User = db.collection("users") as Collection<UserDoc>;
const Session = db.collection("sessions") as Collection<SessionDoc>;

const adapter = new MongodbAdapter(Session, User);

interface UserDoc {
	_id: string;
}

interface SessionDoc {
	_id: string;
	expires_at: Date;
	user_id: string;
}

export const lucia = new Lucia(adapter, {
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
	}
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	username: string;
}
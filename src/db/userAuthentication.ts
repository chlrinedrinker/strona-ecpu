import { Lucia } from "lucia";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import { Collection, MongoClient } from "mongodb";
import { _login } from "./mongo";

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
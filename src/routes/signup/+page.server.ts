// routes/signup/+page.server.ts
import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import { generateIdFromEntropySize } from "lucia";
import { hash } from "@node-rs/argon2";
import type { Actions } from "./$types";
import { PrismaClient, Prisma } from '@prisma/client'
import { _pracownicy } from "$db/mongo";

export const actions: Actions = {
	default: async (event) => {
		let prisma = new PrismaClient()
		const formData = await event.request.formData();
		const username = formData.get("username");
		const password = formData.get("password");
		const imie = formData.get("imie");
		const nazwisko = formData.get('nazwisko');
		const stanowisko = formData.get('stanowisko');
		console.log(stanowisko)
		const ranga = formData.get('ranga');
		const palec = formData.get('fingerID');
		const karta = formData.get('cardID');
		const name = imie + '_' + nazwisko;

		// username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
		// keep in mind some database (e.g. mysql) are case insensitive
		if (
			typeof username !== "string" ||
			username.length < 3 ||
			username.length > 31 ||
			!/^[a-zA-Z0-9_-]+$/.test(username)
		) {
			return fail(400, {
				message: "Invalid username"
			});
		}
		if (typeof password !== "string" || password.length < 6 || password.length > 255) {
			return fail(400, {
				message: "Invalid password"
			});
		}
		if (typeof imie !== "string" || !/^[a-zA-Z]+$/.test(imie)){
			return fail(400, {
				message: "Invalid imie"
			});
		}
		if (typeof nazwisko !== "string" || !/^[a-zA-Z]+$/.test(nazwisko)){
			return fail(400, {
				message: "Invalid nazwisko"
			});
		}
		if (typeof karta !== "string" || !/^[a-zA-Z]+$/.test(karta)){
			return fail(400, {
				message: "Invalid karta"
			});
		}
		if (typeof palec !== "string" || !/^[a-zA-Z]+$/.test(palec)){
			return fail(400, {
				message: "Invalid palec"
			});
		}
		
		const insertIntoPracownicy = {
			cardID: karta,
			FingerID: palec,
			imie: imie,
			nazwisko: nazwisko,
			stanowisko: stanowisko
		}

		_pracownicy.collection('PracownicyID').insertOne(insertIntoPracownicy)
		
		const userId = generateIdFromEntropySize(10); // 16 characters long
		const passwordHash = await hash(password, {
			// recommended minimum parameters
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});



		let user: Prisma.UserCreateInput = {
			id: userId,
            role: +ranga,
			username: username,
			name: name,
			hash_password: passwordHash
		};
		// TODO: check if username is already used
		const User = await prisma.user.create({ data: user})
		console.log("Przypisane do Bazy")
		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});

		redirect(302, "/");
	}
};

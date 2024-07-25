// routes/signup/+page.server.ts
import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import { generateIdFromEntropySize } from "lucia";
import { hash } from "@node-rs/argon2";
import type { Actions } from "./$types";
import { PrismaClient, Prisma } from '@prisma/client'

let prisma = new PrismaClient()

export const actions: Actions = {
	default: async (event) => {
		console.log("I am signUP")
		const formData = await event.request.formData();
		const username = formData.get("username");
		const password = formData.get("password");
		const imie = formData.get("imie")
		const nazwisko = formData.get('nazwisko')
		
		console.log(typeof username)
		// username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
		// keep in mind some database (e.g. mysql) are case insensitive
		if (
			typeof username !== "string" ||
			username.length < 3 ||
			username.length > 31 ||
			!/^[a-z0-9_-]+$/.test(username)
		) {
			console.log("1")
			return fail(400, {
				message: "Invalid username"
			});
		}
		if (typeof password !== "string" || password.length < 6 || password.length > 255) {
			console.log("2")
			return fail(400, {
				message: "Invalid password"
			});
		}
		console.log("3")
		const userId = generateIdFromEntropySize(10); // 16 characters long
		const passwordHash = await hash(password, {
			// recommended minimum parameters
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});
		console.log(passwordHash)
		let user: Prisma.UserCreateInput = {
			id: userId,
            role: 1,
			username: username,
			hash_password: passwordHash
		};
		console.log(user)
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

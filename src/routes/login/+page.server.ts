// routes/login/+page.server.ts
import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import { verify } from "@node-rs/argon2";
import type { Actions } from "./$types";
import { PrismaClient, Prisma } from '@prisma/client'

let prisma = new PrismaClient()

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		console.log("1")
		const username = formData.get("username");
		const password = formData.get("password");
		console.log(username)
		if (
			typeof username !== "string" ||
			username.length < 3 ||
			username.length > 31 ||
			!/^[a-z0-9_-]+$/.test(username)
		) {
			console.log('2')
			return fail(400, {
				message: "Invalid username"
			});
		}
		if (typeof password !== "string" || password.length < 6 || password.length > 255) {
			console.log('3')
			return fail(400, {
				message: "Invalid password"
			});
		}

		const existingUser = await prisma.user.findUnique({
			where: {
				username: username
			},
		})
		console.log('4')
		if (!existingUser) {
			// NOTE:
			// Returning immediately allows malicious actors to figure out valid usernames from response times,
			// allowing them to only focus on guessing passwords in brute-force attacks.
			// As a preventive measure, you may want to hash passwords even for invalid usernames.
			// However, valid usernames can be already be revealed with the signup page among other methods.
			// It will also be much more resource intensive.
			// Since protecting against this is non-trivial,
			// it is crucial your implementation is protected against brute-force attacks with login throttling etc.
			// If usernames are public, you may outright tell the user that the username is invalid.
			return fail(400, {
				message: "Incorrect username or password"
			});
		}
		console.log('5')
		const validPassword = await verify(existingUser.hash_password, password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});
		console.log('6')
		if (!validPassword) {
			console.log("Incorrect name or password")
			return fail(400, {

				message: "Incorrect username or password"
			});
		}
		console.log("Logowanie")
		const session = await lucia.createSession(existingUser.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
		console.log(event.cookies)
		redirect(302, "/");
	}
};

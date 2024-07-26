// Import necessary modules and libraries
import { lucia } from "$lib/server/auth"; // Authentication library
import { fail, redirect } from "@sveltejs/kit"; // SvelteKit utilities
import { generateIdFromEntropySize } from "lucia"; // ID generation
import { hash } from "@node-rs/argon2"; // Password hashing
import type { Actions } from "./$types"; // Type definitions for SvelteKit actions
import { PrismaClient, Prisma } from '@prisma/client'; // Prisma client for database operations

let prisma = new PrismaClient() // Initialize Prisma client

export const actions: Actions = {
    // Define default action for signup
	default: async (event) => {
		console.log("I am signUP")
        // Get form data from the request
		const formData = await event.request.formData();
		const username = formData.get("username");
		const password = formData.get("password");
		const imie = formData.get("imie");
		const nazwisko = formData.get('nazwisko');
		
		console.log(typeof username);
		// Validate the username
		if (
			typeof username !== "string" ||
			username.length < 3 ||
			username.length > 31 ||
			!/^[a-z0-9_-]+$/.test(username)
		) {
			console.log("1");
			return fail(400, {
				message: "Invalid username"
			});
		}

        // Validate the password
		if (typeof password !== "string" || password.length < 6 || password.length > 255) {
			console.log("2");
			return fail(400, {
				message: "Invalid password"
			});
		}
		console.log("3");

        // Generate a unique user ID and hash the password
		const userId = generateIdFromEntropySize(10); // 16 characters long
		const passwordHash = await hash(password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});
		console.log(passwordHash);

        // Create a new user object
		let user: Prisma.UserCreateInput = {
			id: userId,
            role: 1,
			username: username,
			hash_password: passwordHash
		};
		console.log(user);

        // Check if the username is already used
		const existingUser = await prisma.user.findUnique({
			where: { username: username }
		});
		if (existingUser) {
			return fail(400, {
				message: "Username already taken"
			});
		}

        // Create the user in the database
		const User = await prisma.user.create({ data: user });
		console.log("Przypisane do Bazy");

        // Create a session for the user
		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});

        // Redirect to the home page
		redirect(302, "/");
	}
};

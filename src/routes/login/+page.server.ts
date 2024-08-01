// Import necessary modules and libraries
import { lucia } from "$lib/server/auth"; // Authentication library
import { fail, redirect } from "@sveltejs/kit"; // SvelteKit utilities
import { verify } from "@node-rs/argon2"; // Password hashing and verification
import type { Actions } from "./$types"; // Type definitions for SvelteKit actions
import { PrismaClient, Prisma } from '@prisma/client'; // Prisma client for database operations

let prisma = new PrismaClient(); // Initialize Prisma client
let ranga = 3;




export const actions: Actions = {
    // Define default action for login
	default: async (event) => {
        // Get form data from the request
		const formData = await event.request.formData();
		
		const username = formData.get("username");
		const password = formData.get("password");
		
        // Validate the username
		if (
			typeof username !== "string" ||
			username.length < 3 ||
			username.length > 31 ||
			!/^[a-z0-9_-]+$/.test(username)
		) {
			
			return fail(400, {
				message: "Invalid username"
			});
		}

        // Validate the password
		if (typeof password !== "string" || password.length < 6 || password.length > 255) {
			
			return fail(400, {
				message: "Invalid password"
			});
		}

        // Find user in the database
		const existingUser = await prisma.user.findUnique({
			where: {
				username: username
			},
		});
		

        // Check if user exists
		if (!existingUser) {
			return fail(400, {
				message: "Incorrect username or password"
			});
		}
		

        // Verify the password
		const validPassword = await verify(existingUser.hash_password, password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});
		

        // Check if the password is valid
		if (!validPassword) {
			return fail(400, {
				message: "Incorrect username or password"
			});
		}
		ranga = Number(existingUser.role);
        // Create a session for the user
		const session = await lucia.createSession(existingUser.id, {
			ranga: ranga,
			imieNazwisko: existingUser.name
		});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
		

        // Redirect to the home page
		redirect(302, "/");
	}
};
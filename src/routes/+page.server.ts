// +page.server.ts
import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import { isLoggedIn } from "./stores/stores";
import { writable } from 'svelte/store';

import type { Actions, PageServerLoad } from "./$types";
// Store to manage login state
export const load: PageServerLoad = async (event) => {
	console.log("Hello")
	console.log(!event.locals.user)
	if (!event.locals.user) {
		console.log("Login Page Redirect")
		throw redirect(308, "/login");
	}
	return  {
		user: event.locals.user
	}
};

export const actions: Actions = {
	default: async (event) => {
		if (!event.locals.user) {
			throw fail(401);
		}
		console.log("Wylogowanie")
		await lucia.invalidateSession(event.locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
		isLoggedIn.set(false)
		return redirect(302, "/login");
	}
};
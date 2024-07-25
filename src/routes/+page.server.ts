// +page.server.ts
import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";

import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	console.log("Hello")
	console.log(!event.locals.user)
	if (!event.locals.user) {
		console.log("Login Page Redirect")
		throw redirect(308, "/login");
	}
	console.log(event.locals.user)
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
		return redirect(302, "/login");
	}
};
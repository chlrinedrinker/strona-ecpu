// +page.server.ts
import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";

import type { Actions, PageServerLoad } from "./$types";
// Store to manage login state
export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		throw redirect(308, "/login");
	}
	else if(event.locals.user.role != 1) {throw redirect(308, "/login")}
	return  {
		user: event.locals.user
	}
};


export const actions: Actions = {
	default: async (event) => {
		if (!event.locals.user) {
			throw fail(401);
		}
		await lucia.invalidateSession(event.locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
		return redirect(302, "/login");
	}
};
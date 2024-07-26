import { lucia } from "$lib/server/auth"; // Authentication library
import { fail, redirect } from "@sveltejs/kit"; // SvelteKit utilities
import type { Actions, PageServerLoad } from "./$types"; // Type definitions for SvelteKit actions

export const actions: Actions = {
    // Define default action for logout
	default: async (event) => {
        // Check if the user is logged in
		if (!event.locals.user) {
			throw fail(401);
		}
		console.log("Wylogowanie");

        // Invalidate the user session
		await lucia.invalidateSession(event.locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});

        // Redirect to the login page
		return redirect(302, "/login");
	}
};

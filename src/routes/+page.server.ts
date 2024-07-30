// +page.server.ts
import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageLoad, PageServerLoad } from "./$types";
interface Pracownik {
    _id: string;
    imie: string;
    nazwisko: string;
    stanowisko: string;
  }

// Store to manage login state
export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		console.log("Login Page Redirect")
		throw redirect(308, "/login");
	}

	let imie : string, nazwisko: string;
  	let pracownicy: Pracownik[] = []; // Array to hold employees
	let tempPracownicy: Pracownik[] = [];
	imie = event.locals.session.imieNazwisko
	nazwisko = event.locals.session.imieNazwisko
	console.log(imie)
	console.log(event.locals.session.ranga)
  	 // Array to hold logs
  	let error: string | null = null; // Error message
	try {
		const response = await event.fetch('/endpoints/ImieNazStanow');
		if (response.ok){
			if (event.locals.session.ranga == 2) {
				tempPracownicy = await response.json();
				pracownicy = tempPracownicy.filter((obj) => {
					return obj.imie === imie && obj.nazwisko === nazwisko
				})
			}else {
				pracownicy = await response.json();
			}
		}else {
			error = 'Failed to load employees'; // Set error message if the request fails
		}
	} catch (err) {
		error = 'Error loading employees'; // Set error message if an exception occurs
	}
	return  {
		user: event.locals.user,
		session: event.locals.session,
		pracownicy: pracownicy,
		imie: imie,
		nazwisko: nazwisko
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
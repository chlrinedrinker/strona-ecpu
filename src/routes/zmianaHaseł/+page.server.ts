import { redirect, fail } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "../$types";
import { lucia } from "$lib/server/auth";

interface Pracownik {
    _id: string;
    imie: string;
    nazwisko: string;
    stanowisko: string;
  }


export const load: PageServerLoad = async (event) => {

    if (!event.locals.user) {
		throw redirect(308, "/login");
	}
    let error;
    let pracownicy: Pracownik[] = [];
    try{
        const response = await event.fetch('/endpoints/ImieNazStanow')
        if(response.ok){
            pracownicy = await response.json()
        } else {
            error = "Błąd Użytkowników"
        }
    }
    catch (err) {
		error = 'Error loading employees'; // Set error message if an exception occurs
	}
    return {
        pracownicy: pracownicy
    }
}

export const actions: Actions = {
	wyloguj: async (event) => {
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
	},
    zmianaDanychUżytkownika: async (event) => {
        const data = await event.request.formData()
        console.log(data)
        const zmianaLogin = data.get("zmianaLogin")
        const zmianaHasła = data.get("zmianaHasła")
        const zmianaStanowiska = data.get("zmianaStanowiska")
        const wybranyImie = data.get("imie")
        const wybranyNazwisko = data.get("nazwisko")
        

    }
};
// +page.server.ts
import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageLoad, PageServerLoad } from "./$types";
import { _pracownicy, _czas_pracy } from "$db/mongo";

interface Pracownik {
    _id: string;
    imie: string;
    nazwisko: string;
    stanowisko: string;
  }

// Store to manage login state
export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		throw redirect(308, "/login");
	}

	let imie : string, nazwisko: string;
  	let pracownicy: Pracownik[] = []; // Array to hold employees
	let tempPracownicy: Pracownik[] = [];
	let imie_Nazwisko = event.locals.session.imieNazwisko.split("_")
	imie = imie_Nazwisko[0];
	nazwisko = imie_Nazwisko[1];
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
	saveComment: async (event) => {
		const data = await event.request.formData();
		const komentarz = data.get('komentarz');
		const imie = data.get('imie');
		const nazwisko = data.get('nazwisko');
		const data_czas = new Date().toLocaleString(); // Pobranie bieżącej daty i czasu
		const wejscie = data.get('wejscie');
		const db = _czas_pracy.collection(imie + "_" + nazwisko);
	  
		const existingLog = await db.findOne({
		  date: data.get('data'), 
		  entrence_time: wejscie
		});
	  
		let newCommentHistory = data_czas + " " + komentarz;
		if (existingLog && existingLog.historia_komentarza) {
		  newCommentHistory = existingLog.historia_komentarza + "\n" + newCommentHistory;
		}
	  
		await db.updateOne(
		  { date: data.get('data'), entrence_time: wejscie },
		  {
			$set: {
			  komentarz: data_czas + " " + komentarz,
			  historia_komentarza: newCommentHistory
			}
		  }
		);
	  } 
	  
};
import { redirect, fail } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "../$types";
import { lucia } from "$lib/server/auth";
import { hash } from "@node-rs/argon2";
import { PrismaClient } from "@prisma/client";
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
        let prisma = new PrismaClient();
        const data = await event.request.formData()
        console.log(data)
        const zmianaLogin = data.get("zmianaLogin")
        const zmianaHasła = data.get("zmianaHasło")
        const zmianaRanga = data.get("zmianaRanga")
        const zmianaStanowiska = data.get("zmianaStanowiska")
        const wybranyImie = data.get("imie")
        const wybranyNazwisko = data.get("nazwisko")
        const wybranyID = data.get("_id")
        console.log(wybranyID)
        const name = wybranyImie.toString()+"_"+wybranyNazwisko.toString()
        let zmianaUSERS: { [key: string]: string} = {};
        if (zmianaLogin != "" && zmianaLogin != null) {zmianaUSERS['username'] = zmianaLogin.toString()}
        if (zmianaHasła != "" && zmianaHasła != null) {zmianaUSERS['hash_password'] = await hash(zmianaHasła.toString(),{
            memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
        })}
        if (zmianaRanga != "" && zmianaRanga != null) {zmianaUSERS['role'] = zmianaRanga.toString()}
        const stworzUSERS = zmianaUSERS
        stworzUSERS["id"] = wybranyID.toString() 
        stworzUSERS["name"] = name
        if(Object.keys(zmianaUSERS).length !== 0){
            const updateUser = await prisma.user.upsert(
                {
                    where: {
                        id: wybranyID,
                        name: name
                    },
                    update: zmianaUSERS,
                    create: zmianaUSERS
                }
            )
        }
    }
};
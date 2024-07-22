/**@type {import('./$types').PageLoad}*/
import  * as Pracownicy from '$db/pracownicy.js' ;
import type { PageServerLoad } from './$types';

interface Pracownik { 
    imie: string;
    nazwisko: string;
    stanowisko: string;
  }

export async function load(request:Request): Promise<{ data: JSON}> {
    const url = new URL(request.url)
    console.log(url)
    const workers = await Pracownicy.getCollection("PracownicyID", 0, 0);
    console.log(workers)
        return { data: workers};
}
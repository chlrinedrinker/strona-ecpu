import { json } from '@sveltejs/kit';
import dotenv from 'dotenv';
import { _czas_pracy } from '$db/mongo';

dotenv.config();

let projections = {
    _id: 0,
}
function convertDecimalHoursToTime(decimalHours) {
    const hours = Math.floor(decimalHours);
    const minutes = Math.round((decimalHours - hours) * 60);
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
}
export async function GET({ url }: { url: URL }) {
    const imie = url.searchParams.get('imie');
    const nazwisko = url.searchParams.get('nazwisko');

    if (!imie || !nazwisko) {
        return json({ error: 'Imię i nazwisko są wymagane' }, { status: 400 });
    }

    const katalog = `${imie}_${nazwisko}`;

    try {
        const db = _czas_pracy;
        const collection = db.collection(katalog);
        const logi = await collection.find().project(projections).sort({ date: -1 }).toArray();
         // Usuwanie duplikatów według określonego pola
         const uniqueLogi = [];
         const seen = new Set();
         
         for (const log of logi) {
             if (!seen.has(log.date)) {
                 seen.add(log.date);
                 uniqueLogi.push({
                     ...log,
                     hours: convertDecimalHoursToTime(log.hours) // Przekształcenie formatu godzin
                 })
             }
         }
 
         return json(uniqueLogi);
    } catch (error) {
        console.error('Błąd podczas pobierania logów:', error);
        return json({ error: 'Nie udało się pobrać logów' }, { status: 500 });
    }
}

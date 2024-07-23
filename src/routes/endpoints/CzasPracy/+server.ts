import { json } from '@sveltejs/kit';
import dotenv from 'dotenv';
import { _czas_pracy } from '$db/mongo';

dotenv.config();

let projections = {
    _id: 0,
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
        var mysort={date: -1}
        const logi = await collection.find().project(projections).sort(mysort).toArray();
        console.log(logi)
        return json(logi);
    } catch (error) {
        console.error('Błąd podczas pobierania logów:', error);
        return json({ error: 'Nie udało się pobrać logów' }, { status: 500 });
    }
}

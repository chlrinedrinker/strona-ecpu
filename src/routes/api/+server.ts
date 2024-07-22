import { MongoClient } from 'mongodb';
import { json } from '@sveltejs/kit';
import dotenv from 'dotenv';

dotenv.config();

const mongo_url = process.env.MONGO_URL;
const client = new MongoClient(mongo_url);

export async function GET({ url }: { url: URL }) {
    const imie = url.searchParams.get('imie');
    const nazwisko = url.searchParams.get('nazwisko');

    if (!imie || !nazwisko) {
        return json({ error: 'Imię i nazwisko są wymagane' }, { status: 400 });
    }

    const katalog = `${imie}_${nazwisko}`;

    try {
        await client.connect();
        const db = client.db('czas_pracy');
        const collection = db.collection(katalog);
        var mysort={date: -1}
        const logi = await collection.find().sort(mysort).toArray();

        return json(logi);
    } catch (error) {
        console.error('Błąd podczas pobierania logów:', error);
        return json({ error: 'Nie udało się pobrać logów' }, { status: 500 });
    }
}

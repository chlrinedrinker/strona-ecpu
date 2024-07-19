import { MongoClient } from 'mongodb';
import { json } from '@sveltejs/kit';
import dotenv from 'dotenv';

dotenv.config();

const mongo_url = process.env.MONGO_URL;
const client = new MongoClient(mongo_url);

export async function POST({ request }) {
    const { username, password } = await request.json();

    try {
        await client.connect();
        const db = client.db('pracownicy');
        const collection = db.collection('PracownicyID');
        
        const user = await collection.findOne({ imie: username, nazwisko: password });

        if (user) {
            return json({ success: true, message: 'Logowanie udane' });
        } else {
            return json({ success: false, message: 'Niepoprawne dane logowania' });
        }
    } catch (error) {
        console.error(error);
        return json({ success: false, message: 'Wystąpił błąd podczas logowania' }, { status: 500 });
    }
}
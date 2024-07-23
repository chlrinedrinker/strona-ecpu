import { json } from '@sveltejs/kit';
import dotenv from 'dotenv';
import { _pracownicy } from '$db/mongo.js';

dotenv.config();

let projections = {
    _id: 0,
    imie: 1,
    nazwisko: 1,
}

export async function POST({ request }) {
    const { username, password } = await request.json();

    try {
        const db = _pracownicy;
        const collection = db.collection('PracownicyID');
        
        const user = await collection.findOne({ imie: username, nazwisko: password }, {projections});
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
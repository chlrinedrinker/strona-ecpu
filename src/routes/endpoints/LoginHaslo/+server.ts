import { json } from '@sveltejs/kit';
import dotenv from 'dotenv';
import { _pracownicy } from '$db/mongo.js';

dotenv.config();

// Define projections to only include specific fields
let projections = {
    _id: 0,
    imie: 1,
    nazwisko: 1,
}

export async function POST({ request }) {
    // Parse the request body to get username and password
    const { username, password } = await request.json();

    try {
        const db = _pracownicy;
        const collection = db.collection('PracownicyID');
        
        // Find the user with the provided username and password
        const user = await collection.findOne({ imie: username, nazwisko: password }, { projections });
        console.log(user);

        if (user) {
            // Return success message if the user is found
            return json({ success: true, message: 'Logowanie udane' });
        } else {
            // Return failure message if the user is not found
            return json({ success: false, message: 'Niepoprawne dane logowania' });
        }
    } catch (error) {
        console.error(error);
        return json({ success: false, message: 'Wystąpił błąd podczas logowania' }, { status: 500 });
    }
}

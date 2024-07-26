import { json } from '@sveltejs/kit';
import dotenv from 'dotenv';
import { _pracownicy } from '$db/mongo';

dotenv.config();

// Define projections to only include specific fields
let projections = {
    _id: 0,
    imie: 1,
    nazwisko: 1,
    stanowisko: 1,
}

export async function GET() {
    try {
        const db = _pracownicy;
        const collection = db.collection('PracownicyID');
        
        // Retrieve the list of employees and project the necessary fields
        const pracownicy = await collection.find().project(projections).toArray();
        
        // Return the list of employees
        return json(pracownicy);
    } catch (error) {
        console.error(error);
        return json({ error: 'Nie udało się pobrać pracowników' }, { status: 500 });
    }
}

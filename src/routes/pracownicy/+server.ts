import { MongoClient } from 'mongodb';
import { json } from '@sveltejs/kit';
import dotenv from 'dotenv';

dotenv.config();

const mongo_url = process.env.MONGO_URL;
const client = new MongoClient(mongo_url);

export async function GET() {
    try {
        await client.connect();
        const db = client.db('pracownicy');
        const collection = db.collection('PracownicyID');
        
        const pracownicy = await collection.find().toArray();
        
        return json(pracownicy);
    } catch (error) {
        console.error(error);
        return json({ error: 'Nie udało się pobrać pracowników' }, { status: 500 });
    }
}
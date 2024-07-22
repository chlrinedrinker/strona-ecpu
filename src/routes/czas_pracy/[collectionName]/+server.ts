import { json } from '@sveltejs/kit';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongo_url = process.env.MONGO_URL;
const client = new MongoClient(mongo_url);

export async function GET({ params }) {
  const { collectionName } = params;
  console.log(collectionName);
  
  try {
    await client.connect();
    const db = client.db('czas_pracy');
    
    // Używanie nazwy kolekcji z parametrów
    const collection = db.collection(`${collectionName}`);
    const logowania = await collection.find().toArray();
    
    return json(logowania);
  } catch (error) {
    console.error('Error fetching logs:', error);
    return json({ error: 'Błąd podczas pobierania logowań' }, { status: 500 });
  } finally {
    await client.close();
  }
}

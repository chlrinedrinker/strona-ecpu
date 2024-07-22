import { MONGO_URL } from '$env/static/private';
import { MongoClient } from 'mongodb';

const client = new MongoClient(MONGO_URL);

// connect to the database
export async function connect(): Promise<void> {
    console.log("MongoDB Has Been Started")
    await client.connect();
}

// disconnect from the database
export async function disconnect(): Promise<void> {
    console.log("MongoDB has been closed")
    await client.close();
}

// get the database
export function getPracownicyDB(){
    return client.db('Pracownicy');
}
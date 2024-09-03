import { MONGO_URL } from '$env/static/private';
import { MongoClient } from 'mongodb';

export const client = new MongoClient(MONGO_URL);
export const _login = client.db('login')


// connect to the database
export async function connect(): Promise<void> {
    await client.connect();
}

// get the database
export function getDB(): any {
    return client.db();
}
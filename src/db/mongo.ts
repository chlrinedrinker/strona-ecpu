import { MONGO_URL } from '$env/static/private';
import { MongoClient } from 'mongodb';

const client = new MongoClient(MONGO_URL);
export const _pracownicy = client.db('pracownicy')
export const _czas_pracy = client.db('czas_pracy')
export const _login = client.db('login')

// connect to the database
export async function connect(): Promise<void> {
    await client.connect();
}

// disconnect from the database
export async function disconnect(): Promise<void> {
    await client.close();
}

// get the database
export function getDB(): any {
    return client.db();
}
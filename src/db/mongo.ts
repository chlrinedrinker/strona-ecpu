import { MONGO_URL } from '$env/static/private';
import { MongoClient } from 'mongodb';

const client = new MongoClient(MONGO_URL);
await client.connect()
export const _pracownicy = client.db('pracownicy')
export const _czas_pracy = client.db('czas_pracy')
export const _login = client.db('login')

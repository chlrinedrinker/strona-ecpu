import { getDB } from '$db/mongo';
const db = getDB();

export const pracownicy = db.collection('pracownicy')

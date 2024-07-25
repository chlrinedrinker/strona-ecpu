import { json } from '@sveltejs/kit';
import { _czas_pracy } from '$db/mongo';

export async function POST({ request }) {
  const { user, date, comment, logId } = await request.json();
    console.log(date)
  if (!user || !date || !logId) {
    return json({ error: 'Niepoprawne dane wejściowe' }, { status: 400 });
  }

  try {
    const db = _czas_pracy;
    const collection = db.collection(`${user.imie}_${user.nazwisko}`);
    
    await collection.updateOne(
      { _id: logId }, // Użyj unikalnego identyfikatora logu, jeśli dostępny
      { $set: { comment } }
    );

    return json({ success: true });
  } catch (error) {
    console.error('Błąd podczas zapisywania komentarza:', error);
    return json({ error: 'Nie udało się zapisać komentarza' }, { status: 500 });
  }
}

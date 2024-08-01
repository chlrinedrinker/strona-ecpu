import { json } from '@sveltejs/kit';
import { _czas_pracy } from '$db/mongo';

export async function POST({ request }) {
    // Parse the request body to get user, date, comment, and logId
    const { user, date, comment, logId } = await request.json();
    

    // Return an error if any of the required fields are missing
    if (!user || !date || !logId) {
        return json({ error: 'Niepoprawne dane wejściowe' }, { status: 400 });
    }

    try {
        const db = _czas_pracy;
        const collection = db.collection(`${user.imie}_${user.nazwisko}`);
        
        // Update the comment for the specified log entry
        await collection.updateOne(
            { _id: logId }, // Use the unique log identifier
            { $set: { comment } }
        );

        // Return success message
        return json({ success: true });
    } catch (error) {
        console.error('Błąd podczas zapisywania komentarza:', error);
        return json({ error: 'Nie udało się zapisać komentarza' }, { status: 500 });
    }
}

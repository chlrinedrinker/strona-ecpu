import { j as json } from "../../../../chunks/index.js";
import { _ as _czas_pracy } from "../../../../chunks/mongo.js";
async function POST({ request }) {
  const { user, date, comment, logId } = await request.json();
  if (!user || !date || !logId) {
    return json({ error: "Niepoprawne dane wejściowe" }, { status: 400 });
  }
  try {
    const db = _czas_pracy;
    const collection = db.collection(`${user.imie}_${user.nazwisko}`);
    await collection.updateOne(
      { _id: logId },
      // Use the unique log identifier
      { $set: { comment } }
    );
    return json({ success: true });
  } catch (error) {
    console.error("Błąd podczas zapisywania komentarza:", error);
    return json({ error: "Nie udało się zapisać komentarza" }, { status: 500 });
  }
}
export {
  POST
};

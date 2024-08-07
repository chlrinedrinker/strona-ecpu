import dotenv from "dotenv";
import { _ as _czas_pracy } from "../../../../chunks/mongo.js";
import { j as json } from "../../../../chunks/index.js";
dotenv.config();
function convertDecimalHoursToTime(decimalHours) {
  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);
  return `${hours}:${minutes.toString().padStart(2, "0")}`;
}
async function GET({ url }) {
  const imie = url.searchParams.get("imie");
  const nazwisko = url.searchParams.get("nazwisko");
  if (!imie || !nazwisko) {
    return json({ error: "Imię i nazwisko są wymagane" }, { status: 400 });
  }
  const katalog = `${imie}_${nazwisko}`;
  try {
    const db = _czas_pracy;
    const collection = db.collection(katalog);
    const logi = await collection.find().sort({ date: -1 }).toArray();
    const uniqueLogi = [];
    const seen = /* @__PURE__ */ new Set();
    for (const log of logi) {
      uniqueLogi.push({
        ...log,
        hours: convertDecimalHoursToTime(log.hours)
        // Convert hours format
      });
    }
    return json(uniqueLogi);
  } catch (error) {
    console.error("Błąd podczas pobierania logów:", error);
    return json({ error: "Nie udało się pobrać logów" }, { status: 500 });
  }
}
export {
  GET
};

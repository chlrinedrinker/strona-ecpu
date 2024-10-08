import dotenv from "dotenv";
import { _czas_pracy } from "$db/mongo";
import { json } from "@sveltejs/kit";

dotenv.config();

// Define projections to exclude _id field from the response

// Convert decimal hours to HH:MM format
function convertDecimalHoursToTime(decimalHours: number) {
  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);
  return `${hours}:${minutes.toString().padStart(2, "0")}`;
}

export async function GET({ url }: { url: URL }) {
  // Extract 'imie' and 'nazwisko' from query parameters
  const imie = url.searchParams.get("imie");
  const nazwisko = url.searchParams.get("nazwisko");

  // Return an error if 'imie' or 'nazwisko' is missing
  if (!imie || !nazwisko) {
    return json({ error: "Imię i nazwisko są wymagane" }, { status: 400 });
  }

  // Construct the collection name from 'imie' and 'nazwisko'
  const katalog = `${imie}_${nazwisko}`;

  try {
    const db = _czas_pracy;
    const collection = db.collection(katalog);

    // Retrieve logs from the collection, sort by date and then by entryTime
    const logi = await collection.find().sort({ date: -1, entrence_time: 1 }).toArray();

    // Process logs and convert hours format
    const uniqueLogi = logi.map(log => ({
      ...log,
      hours: convertDecimalHoursToTime(log.hours), // Convert hours format
    }));

    // Return the processed logs
    return json(uniqueLogi);
  } catch (error) {
    console.error("Błąd podczas pobierania logów:", error);
    return json({ error: "Nie udało się pobrać logów" }, { status: 500 });
  }
}

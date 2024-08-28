import dotenv from "dotenv";
import { _czas_pracy } from "$db/mongo";
import { json } from "@sveltejs/kit";

dotenv.config();

function convertDecimalHoursToTime(decimalHours: number) {
  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);
  return `${hours}:${minutes.toString().padStart(2, "0")}`;
}

export async function GET({ url }: { url: URL }) {
  const imie = url.searchParams.get("imie");
  const nazwisko = url.searchParams.get("nazwisko");
  const period = url.searchParams.get("period"); // Added period parameter

  if (!imie || !nazwisko) {
    return json({ error: "Imię i nazwisko są wymagane" }, { status: 400 });
  }

  const katalog = `${imie}_${nazwisko}`;
  const db = _czas_pracy;
  const collection = db.collection(katalog);

  try {
    let startDate: Date;
    let endDate: Date;

    if (period === 'month') {
      startDate = new Date();
      startDate.setDate(1); // Start of the current month
      endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1); // End of the current month
    } else if (period === 'week') {
      startDate = new Date();
      const dayOfWeek = startDate.getDay();
      startDate.setDate(startDate.getDate() - dayOfWeek); // Start of the current week
      endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 7); // End of the current week
    } else {
      return json({ error: "Nieprawidłowy okres" }, { status: 400 });
    }

    const logi = await collection.aggregate([
      {
        $match: {
          date: {
            $gte: startDate.toISOString().split('T')[0],
            $lt: endDate.toISOString().split('T')[0]
          }
        }
      },
      {
        $group: {
          _id: null,
          totalHours: { $sum: "$hours" }
        }
      }
    ]).toArray();

    const totalHours = logi.length > 0 ? logi[0].totalHours : 0;

    return json({
      totalHours: convertDecimalHoursToTime(totalHours) // Convert total hours to HH:MM format
    });
  } catch (error) {
    console.error("Błąd podczas pobierania logów:", error);
    return json({ error: "Nie udało się pobrać logów" }, { status: 500 });
  }
}

import dotenv from "dotenv";
import { _czas_pracy, _pracownicy } from "$db/mongo";
import { json } from "@sveltejs/kit";

dotenv.config();

function convertDecimalHoursToTime(decimalHours: number) {
  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);
  return `${hours}:${minutes.toString().padStart(2, "0")}`;
}

let projections = {
  _id: 0,
  imie: 1,
  nazwisko: 1,
  stanowisko: 1
};

export async function GET({ url }: { url: URL }) {

  let resoult: {
    imie: string,
    nazwisko: string,
    stanowisko: string,
    totalHours: string
  }[] = []
  
  
  try {
    const ludzie = await _pracownicy.collection("PracownicyID").find({},{sort: {imie: 1, nazwisko: 1}, projection: projections}).toArray();;
    const period = url.searchParams.get("period"); // Added period parameter
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
    const db = _czas_pracy;

    await Promise.all(ludzie.map(async (ludz) => {
      const katalog = `${ludz["imie"]}_${ludz['nazwisko']}`;
      const collection = db.collection(katalog);
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
      
       // Convert total hours to HH:MM format
      await resoult.push({imie: ludz["imie"], nazwisko: ludz["nazwisko"], stanowisko: ludz["stanowisko"], totalHours: convertDecimalHoursToTime(totalHours)})
  
    }))
  
  
    return json(resoult.sort((a, b) => {
      if (a.imie < b.imie) return -1;
      if (a.imie > b.imie) return 1;
    
      // If `imie` is the same, then compare by the `nazwisko` field
      if (a.nazwisko < b.nazwisko) return -1;
      if (a.nazwisko > b.nazwisko) return 1;
    
      return 0; // If both `imie` and `nazwisko` are the same, return 0


     // names must be equal
    return 0;
  }));
  } catch (error) {
    console.error("Błąd podczas pobierania logów:", error);
    return json({ error: "Nie udało się pobrać logów" }, { status: 500 });
  }
}

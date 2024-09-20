import dotenv from "dotenv";
import { c as client } from "../../../../chunks/mongo.js";
import { j as json } from "../../../../chunks/index.js";
import { subWeeks } from "date-fns";
dotenv.config();
function convertDecimalHoursToTime(decimalHours) {
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
async function GET(event) {
  let resoult = [];
  try {
    const ludzie = await client.db(event.locals.session?.organization).collection("PracownicyID").find({}, { sort: { imie: 1, nazwisko: 1 }, projection: projections }).toArray();
    const period = event.url.searchParams.get("period");
    const selectedMonth = event.url.searchParams.get("month");
    const selectedWeek = event.url.searchParams.get("week");
    const previousWeek = event.url.searchParams.get("previous-week");
    let startDate;
    let endDate;
    if (period === "month") {
      if (selectedMonth) {
        const [year, month] = selectedMonth.split("-").map(Number);
        startDate = new Date(year, month - 1, 1);
        endDate = new Date(year, month, 1);
      } else {
        startDate = /* @__PURE__ */ new Date();
        startDate.setDate(1);
        endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1);
      }
    } else if (period === "week" || previousWeek === "true") {
      if (selectedWeek) {
        const [year, week] = selectedWeek.split("-").map(Number);
        startDate = getStartOfWeek(year, week);
        endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 7);
      } else {
        startDate = /* @__PURE__ */ new Date();
        const dayOfWeek = startDate.getDay();
        startDate.setDate(startDate.getDate() - dayOfWeek);
        endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 7);
        if (previousWeek === "true") {
          startDate = subWeeks(startDate, 1);
          endDate = subWeeks(endDate, 1);
        }
      }
    } else {
      return json({ error: "Nieprawidłowy okres" }, { status: 400 });
    }
    const db = client.db(event.locals.session?.organization);
    await Promise.all(ludzie.map(async (ludz) => {
      const katalog = `${ludz["imie"]}_${ludz["nazwisko"]}`;
      const collection = db.collection(katalog);
      const logi = await collection.aggregate([
        {
          $match: {
            date: {
              $gte: startDate.toISOString().split("T")[0],
              $lt: endDate.toISOString().split("T")[0]
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
      await resoult.push({ imie: ludz["imie"], nazwisko: ludz["nazwisko"], stanowisko: ludz["stanowisko"], totalHours: convertDecimalHoursToTime(totalHours) });
    }));
    return json(resoult.sort((a, b) => {
      if (a.imie < b.imie)
        return -1;
      if (a.imie > b.imie)
        return 1;
      if (a.nazwisko < b.nazwisko)
        return -1;
      if (a.nazwisko > b.nazwisko)
        return 1;
      return 0;
    }));
  } catch (error) {
    console.error("Błąd podczas pobierania logów:", error);
    return json({ error: "Nie udało się pobrać logów" }, { status: 500 });
  }
}
function getStartOfWeek(year, week) {
  const januaryFirst = new Date(year, 0, 1);
  const daysOffset = (week - 1) * 7 - januaryFirst.getDay() + 1;
  const startOfWeek2 = new Date(januaryFirst.setDate(januaryFirst.getDate() + daysOffset));
  return startOfWeek2;
}
export {
  GET
};

import { j as json } from "../../../../chunks/index.js";
import dotenv from "dotenv";
import { a as _pracownicy } from "../../../../chunks/mongo.js";
dotenv.config();
let projections = {
  _id: 1,
  imie: 1,
  nazwisko: 1,
  stanowisko: 1,
  active: 1
};
async function GET() {
  try {
    const db = _pracownicy;
    const collection = db.collection("PracownicyID");
    const pracownicy = await collection.find().project(projections).toArray();
    return json(pracownicy);
  } catch (error) {
    console.error(error);
    return json({ error: "Nie udało się pobrać pracowników" }, { status: 500 });
  }
}
export {
  GET
};

import { json } from "@sveltejs/kit";
import dotenv from "dotenv";
import { client } from "$db/mongo";

dotenv.config();

// Define projections to only include specific fields
let projections = {
  _id: 1,
  imie: 1,
  nazwisko: 1,
  stanowisko: 1,
  active: 1,
};

export async function GET(event) {
  try {
    
    const db = client.db(event.locals.session?.organization);
    const collection = db.collection("PracownicyID");

    // Retrieve the list of employees and project the necessary fields
    const pracownicy = await collection.find({},{sort: {imie: 1, nazwisko: 1}, projection: projections}).toArray();
    console.log(json(pracownicy))
    // Return the list of employees
    return json(pracownicy);
  } catch (error) {
    console.error(error);
    return json({ error: "Nie udało się pobrać pracowników" }, { status: 500 });
  }
}

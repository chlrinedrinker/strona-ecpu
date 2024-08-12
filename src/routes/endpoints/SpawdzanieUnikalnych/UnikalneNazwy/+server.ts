import { json } from "@sveltejs/kit";
import dotenv from "dotenv";
import { _login } from "$db/mongo";

dotenv.config();
const projection = {
    _id: 0,
    name: 1,
}


export async function GET() {
    try {
        const collection = _login.collection("User")

        const unikatoweNazwy = await collection.find({}, {projection: projection}).toArray()
        
        return json(unikatoweNazwy)
    } catch (error) {
        console.log(error)
        return json({ error: "Nie udało się pobrać unikalnych nazw" }, { status: 500 });
    }

}
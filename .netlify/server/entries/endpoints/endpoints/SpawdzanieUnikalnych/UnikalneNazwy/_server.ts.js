import { j as json } from "../../../../../chunks/index.js";
import dotenv from "dotenv";
import { _ as _login } from "../../../../../chunks/mongo.js";
dotenv.config();
const projection = {
  _id: 0,
  name: 1
};
async function GET() {
  try {
    const collection = _login.collection("User");
    const unikatoweNazwy = await collection.find({}, { projection }).toArray();
    return json(unikatoweNazwy);
  } catch (error) {
    console.log(error);
    return json({ error: "Nie udało się pobrać unikalnych nazw" }, { status: 500 });
  }
}
export {
  GET
};

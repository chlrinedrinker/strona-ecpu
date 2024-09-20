import { j as json } from "../../../../../chunks/index.js";
import dotenv from "dotenv";
import { _ as _login } from "../../../../../chunks/mongo.js";
dotenv.config();
const projection = {
  _id: 0,
  username: 1
};
async function GET() {
  try {
    const collection = _login.collection("User");
    const unikatoweLoginy = await collection.find({}, { projection }).toArray();
    return json(unikatoweLoginy);
  } catch (error) {
    console.log(error);
    return json({ error: "Nie udało się pobrać unikalnych nazw" }, { status: 500 });
  }
}
export {
  GET
};

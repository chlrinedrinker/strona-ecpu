import { MongoClient } from "mongodb";
const MONGO_URL = "mongodb+srv://1smyku1:PzVTBrk0pZKLwLeC@ewidencjaczasupracygmin.y9rld.mongodb.net/?retryWrites=true&w=majority&appName=EwidencjaCzasuPracyGmina";
const client = new MongoClient(MONGO_URL);
const _pracownicy = client.db("pracownicy");
const _czas_pracy = client.db("czas_pracy");
const _login = client.db("login");
async function connect() {
  await client.connect();
}
export {
  _czas_pracy as _,
  _pracownicy as a,
  _login as b,
  connect as c
};

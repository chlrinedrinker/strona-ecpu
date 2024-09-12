import { l as lucia } from "../../chunks/auth.js";
import { r as redirect, f as fail } from "../../chunks/index.js";
import { _ as _czas_pracy } from "../../chunks/mongo.js";
const load = async (event) => {
  if (!event.locals.user) {
    throw redirect(308, "/login");
  }
  let imie, nazwisko;
  let pracownicy = [];
  let tempPracownicy = [];
  let imie_Nazwisko = event.locals.session.imieNazwisko.split("_");
  imie = imie_Nazwisko[0];
  nazwisko = imie_Nazwisko[1];
  let activeUsers = [];
  let error = null;
  try {
    const response = await event.fetch("/endpoints/ImieNazStanow");
    if (response.ok) {
      tempPracownicy = await response.json();
      if (event.locals.session.ranga == 2) {
        pracownicy = tempPracownicy.filter((obj) => {
          return obj.imie === imie && obj.nazwisko === nazwisko;
        });
      } else {
        pracownicy = tempPracownicy;
      }
      activeUsers = tempPracownicy.filter((obj) => {
        return obj.active === "Obecny";
      });
    } else {
      error = "Failed to load employees";
    }
  } catch (err) {
    error = "Error loading employees";
  }
  return {
    user: event.locals.user,
    session: event.locals.session,
    pracownicy,
    imie,
    nazwisko,
    active: activeUsers
  };
};
const actions = {
  wyloguj: async (event) => {
    if (!event.locals.user) {
      throw fail(401);
    }
    await lucia.invalidateSession(event.locals.session.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    });
    return redirect(302, "/login");
  },
  saveComment: async (event) => {
    const data = await event.request.formData();
    const komentarz = data.get("komentarz");
    const imie = data.get("imie");
    const nazwisko = data.get("nazwisko");
    const data_czas = (/* @__PURE__ */ new Date()).toLocaleString();
    const wejscie = data.get("wejscie");
    const db = _czas_pracy.collection(imie + "_" + nazwisko);
    const existingLog = await db.findOne({
      date: data.get("data"),
      entrence_time: wejscie
    });
    let newCommentHistory = data_czas + " " + komentarz;
    if (existingLog && existingLog.historia_komentarza) {
      newCommentHistory = existingLog.historia_komentarza + "\n" + newCommentHistory;
    }
    await db.updateOne(
      { date: data.get("data"), entrence_time: wejscie },
      {
        $set: {
          komentarz,
          historia_komentarza: newCommentHistory,
          is_edit: true
        }
      }
    );
  },
  editEntrenceHours: async (event) => {
    const data = await event.request.formData();
    const date = data.get("data");
    const imie = data.get("imie");
    const nazwisko = data.get("nazwisko");
    const wejscie = data.get("entrance_time");
    const wejscie1 = data.get("wejscie1");
    const wyjscie = data.get("wyjscie");
    const db = _czas_pracy.collection(imie + "_" + nazwisko);
    function parseTime(timeStr) {
      const [hours2, minutes, seconds = "00"] = timeStr.split(":").map(Number);
      return new Date(1970, 0, 1, hours2, minutes, seconds);
    }
    function calculateHourDifference(startTime, endTime) {
      const start = parseTime(startTime);
      const end = parseTime(endTime);
      const diffMs = end - start;
      return (diffMs / (1e3 * 60 * 60)).toFixed(2);
    }
    const hours = calculateHourDifference(wejscie, wejscie1);
    await db.updateOne(
      { date, exit_time: wyjscie },
      {
        $set: {
          entrence_time: wejscie,
          exit_time: wejscie1,
          hours,
          is_edit: true
        }
      }
    );
  },
  editExitHours: async (event) => {
    const data = await event.request.formData();
    const date = data.get("data");
    const imie = data.get("imie");
    const nazwisko = data.get("nazwisko");
    const wyjscie = data.get("exit_time");
    const wejscie = data.get("wejscie");
    const db = _czas_pracy.collection(imie + "_" + nazwisko);
    function parseTime(timeStr) {
      const [hours2, minutes, seconds = "00"] = timeStr.split(":").map(Number);
      return new Date(1970, 0, 1, hours2, minutes, seconds);
    }
    function calculateHourDifference(startTime, endTime) {
      const start = parseTime(startTime);
      const end = parseTime(endTime);
      const diffMs = end - start;
      return (diffMs / (1e3 * 60 * 60)).toFixed(2);
    }
    const hours = calculateHourDifference(wejscie, wyjscie);
    await db.updateOne(
      { date, entrence_time: wejscie },
      {
        $set: {
          exit_time: wyjscie,
          hours,
          is_edit: true
        }
      }
    );
  },
  editHours: async (event) => {
    const data = await event.request.formData();
    const date = data.get("data");
    const imie = data.get("imie");
    const nazwisko = data.get("nazwisko");
    const wejscie = data.get("wejscie");
    const godziny = parseFloat(data.get("hours"));
    const db = _czas_pracy.collection(imie + "_" + nazwisko);
    await db.updateOne(
      { date, entrence_time: wejscie },
      {
        $set: {
          hours: godziny
        }
      }
    );
  },
  deleteLog: async (event) => {
    const data = await event.request.formData();
    const date = data.get("data");
    const imie = data.get("imie");
    const nazwisko = data.get("nazwisko");
    const wejscie = data.get("wejscie");
    const db = _czas_pracy.collection(imie + "_" + nazwisko);
    await db.deleteOne({ date, entrence_time: wejscie });
    return { success: true };
  },
  PokazLogiUżytkownika: async (event) => {
    await event.request.formData();
    try {
      const response = await fetch(
        `/endpoints/CzasPracy?imie=${encodeURIComponent(user.imie)}&nazwisko=${encodeURIComponent(user.nazwisko)}`
      );
      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `Failed to fetch logs: ${response.status} ${response.statusText} - ${errorText}`
        );
        return [];
      }
      return await response.json();
    } catch (err) {
      console.error("Błąd podczas ładowania logów:", err);
      return [];
    }
  },
  addLog: async (event) => {
    const data = await event.request.formData();
    const date = data.get("date");
    const entrance_time = data.get("entrance_time");
    const exit_time = data.get("exit_time");
    const hours = parseFloat(data.get("hours").toString());
    const komentarz = data.get("komentarz");
    const imie = data.get("imie");
    const nazwisko = data.get("nazwisko");
    const db = _czas_pracy.collection(imie + "_" + nazwisko);
    await db.insertOne({
      date,
      entrence_time: entrance_time,
      exit_time,
      hours,
      komentarz,
      historia_komentarza: komentarz ? (/* @__PURE__ */ new Date()).toLocaleString() + " " + komentarz : "",
      is_edit: true
    });
    return { success: true };
  },
  selectTypeOfBreak: async (event) => {
    function parseTime(timeStr) {
      const [hours, minutes, seconds = "00"] = timeStr.split(":").map(Number);
      return new Date(1970, 0, 1, hours, minutes, seconds);
    }
    function calculateHourDifference(startTime, endTime) {
      const start = parseTime(startTime);
      const end = parseTime(endTime);
      const diffMs = end - start;
      return (diffMs / (1e3 * 60 * 60)).toFixed(2);
    }
    const data = await event.request.formData();
    const date = data.get("data");
    const entrance_time = data.get("wejscie");
    const imie = data.get("imie");
    const nazwisko = data.get("nazwisko");
    const typ = parseInt(data.get("typ").toString());
    const exit_time = data.get("wyjscie");
    const db = _czas_pracy.collection(imie + "_" + nazwisko);
    if (typ == 0) {
      await db.updateOne(
        {
          date,
          entrence_time: entrance_time
        },
        {
          $set: {
            hours: 0,
            komentarz: "Wyjście Prywatne"
          }
        }
      );
    }
    if (typ == 1) {
      await db.updateOne(
        {
          date,
          entrence_time: entrance_time
        },
        {
          $set: {
            komentarz: "Wyjście służbowe",
            hours: calculateHourDifference(entrance_time, exit_time)
          }
        }
      );
    }
    return { success: true };
  }
};
export {
  actions,
  load
};

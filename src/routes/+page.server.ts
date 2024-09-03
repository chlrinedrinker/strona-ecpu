import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { client } from "$db/mongo";

interface Pracownik {
  _id: string;
  imie: string;
  nazwisko: string;
  stanowisko: string;
  active: string;
}

// Store to manage login state
export const load: PageServerLoad = async (event) => {
  if (!event.locals.user) {
    throw redirect(308, "/login");
  }


  
  console.log(event.locals.user)
  console.log(event.locals.session)
  let imie: string, nazwisko: string;
  let pracownicy: Pracownik[] = []; // Array to hold employees
  let tempPracownicy: Pracownik[] = [];
  let imie_Nazwisko = event.locals.session!.imieNazwisko.split("_");
  imie = imie_Nazwisko[0];
  nazwisko = imie_Nazwisko[1];
  let activeUsers: Pracownik[] = [];
  // Array to hold logs
  let error: string | null = null; // Error message
  try {
    const response = await event.fetch("/endpoints/ImieNazStanow");
    if (response.ok) {
      tempPracownicy = await response.json();
      if (event.locals.session!.ranga == 2) {
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
      error = "Failed to load employees"; // Set error message if the request fails
    }
  } catch (err) {
    error = "Error loading employees"; // Set error message if an exception occurs
  }

  return {
    user: event.locals.user,
    session: event.locals.session,
    pracownicy: pracownicy,
    imie: imie,
    nazwisko: nazwisko,
    active: activeUsers,
    
  };
};

export const actions: Actions = {
  wyloguj: async (event) => {
    if (!event.locals.user) {
      throw fail(401);
    }
    await lucia.invalidateSession(event.locals.session!.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });
    return redirect(302, "/login");
  },
  saveComment: async (event) => {
    const data = await event.request.formData();
    const komentarz = data.get("komentarz");
    const imie = data.get("imie");
    const nazwisko = data.get("nazwisko");
    const data_czas = new Date().toLocaleString(); // Pobranie bieżącej daty i czasu
    const wejscie = data.get("wejscie");
    const db = _czas_pracy.collection(imie + "_" + nazwisko);

    const existingLog = await db.findOne({
      date: data.get("data"),
      entrence_time: wejscie,
    });

    let newCommentHistory = data_czas + " " + komentarz;
    if (existingLog && existingLog.historia_komentarza) {
      newCommentHistory =
        existingLog.historia_komentarza + "\n" + newCommentHistory;
    }

    await db.updateOne(
      { date: data.get("data"), entrence_time: wejscie },
      {
        $set: {
          komentarz: komentarz,
          historia_komentarza: newCommentHistory,
          is_edit: true,
        },
      },
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
      const [hours, minutes, seconds = "00"] = timeStr.split(":").map(Number);
      return new Date(1970, 0, 1, hours, minutes, seconds);
  }

  // Helper function to calculate the difference in hours between two times
  function calculateHourDifference(startTime, endTime) {
      const start = parseTime(startTime);
      const end = parseTime(endTime);
      const diffMs = end - start; // Difference in milliseconds
      return (diffMs / (1000 * 60 * 60)).toFixed(2); // Convert to hours and round to 2 decimal places
  }

  // Calculate the difference in hours between wejscie and wejscie1
  const hours = calculateHourDifference(wejscie, wejscie1);
  
    await db.updateOne(
      { date: date, exit_time: wyjscie },
      {
        $set: {
          entrence_time: wejscie,
          exit_time: wejscie1,
          hours: hours,
          is_edit: true,

        },
      },
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
      const [hours, minutes, seconds = "00"] = timeStr.split(":").map(Number);
      return new Date(1970, 0, 1, hours, minutes, seconds);
  }

  // Helper function to calculate the difference in hours between two times
  function calculateHourDifference(startTime, endTime) {
      const start = parseTime(startTime);
      const end = parseTime(endTime);
      const diffMs = end - start; // Difference in milliseconds
      return (diffMs / (1000 * 60 * 60)).toFixed(2); // Convert to hours and round to 2 decimal places
  }

  // Calculate the difference in hours between wejscie and wejscie1
  const hours = calculateHourDifference(wejscie, wyjscie);
    await db.updateOne(
      { date: date, entrence_time: wejscie },
      {
        $set: {
          exit_time: wyjscie,
          hours: hours,
          is_edit: true,
        },
      },
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
      { date: date, entrence_time: wejscie },
      {
        $set: {
          hours: godziny,
        },
      },
    );
  },
  deleteLog: async (event) => {
    const data = await event.request.formData();
    const date = data.get("data");
    const imie = data.get("imie");
    const nazwisko = data.get("nazwisko");
    const wejscie = data.get("wejscie");

    const db = _czas_pracy.collection(imie + "_" + nazwisko);

    // Usuń log na podstawie daty i godziny wejścia
    await db.deleteOne({ date: date, entrence_time: wejscie });
    return { success: true };
},

  PokazLogiUżytkownika: async (event) => {
    const data = await event.request.formData();
    try {
      const response = await fetch(
        `/endpoints/CzasPracy?imie=${encodeURIComponent(user.imie)}&nazwisko=${encodeURIComponent(user.nazwisko)}`,
      );
      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `Failed to fetch logs: ${response.status} ${response.statusText} - ${errorText}`,
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
    const hours = parseFloat(data.get("hours")!.toString());
    const komentarz = data.get("komentarz");
    const imie = data.get("imie")
    const nazwisko = data.get("nazwisko")
    const db = _czas_pracy.collection(imie + "_" + nazwisko);

    await db.insertOne({
      date,
      entrence_time: entrance_time,
      exit_time,
      hours,
      komentarz,
      historia_komentarza: komentarz ? new Date().toLocaleString() + " " + komentarz : "",
      is_edit: true,
    });

    return { success: true };
  },
  selectTypeOfBreak: async (event) => {
    function parseTime(timeStr: string) {
      const [hours, minutes, seconds = "00"] = timeStr.split(":").map(Number);
      return new Date(1970, 0, 1, hours, minutes, seconds);
    }

    function calculateHourDifference(startTime: string, endTime: string) {
      const start = parseTime(startTime);
      const end = parseTime(endTime);
      const diffMs = end - start; // Difference in milliseconds
      return (diffMs / (1000 * 60 * 60)).toFixed(2); // Convert to hours and round to 2 decimal places
  }

    const data = await event.request.formData();
    const date = data.get("data");
    const entrance_time = data.get("wejscie");
    const imie = data.get("imie")
    const nazwisko = data.get("nazwisko")
    const typ = parseInt(data.get("typ")!.toString())
    const exit_time = data.get("wyjscie")
    const db = _czas_pracy.collection(imie + "_" + nazwisko)

    if (typ == 0){
      await db.updateOne({
        date: date,
        entrence_time: entrance_time,
    },
    {
      $set: {
        hours: 0,
        komentarz: "Wyjście Prywatne"
      }
    }
    )
    }
    if (typ == 1){
      await db.updateOne({
        date: date,
        entrence_time: entrance_time,
    },
    {
      $set: {
        komentarz: "Wyjście służbowe",
        hours: calculateHourDifference(entrance_time, exit_time)
      }
    }
    )
    }
    return {success: true};
    
  }
};

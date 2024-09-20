import {
  schedule
} from '@netlify/functions'
import {
  MongoClient
} from 'mongodb'
import {
  TuyaContext
} from '@tuya/tuya-connector-nodejs';
import {
  prototype
} from 'events';
import {
  data
} from 'autoprefixer';
require("dotenv").config()

const uri = process.env.MONGO_URL
const client = new MongoClient(uri)
let crypto = require("crypto")


const tuya = new TuyaContext({
  baseUrl: 'https://openapi.tuyaeu.com',
  accessKey: '4ju4c79xfp9tjvtk3wmt',
  secretKey: '1da4e36b85e54d78b873b999354f609a',
});

const TuyaGetLogs = async (device: string) => {
  const firstPart = '/v2.1/cloud/thing/'
  const secondPart = '/report-logs?codes=unlock_card_kit%2Cunlock_fingerprint_kit&end_time=2251515231311&size=100&start_time=1453151331311'
  try {
      let data = await tuya.request({
          method: 'GET',
          path: firstPart + device + secondPart,
          body: {}
      })
      console.log("Logs Retrive Succesfully")
      return data
  } catch (error) {
      console.log("Failed to retrive LOGS")
      return {
          statuscode: 408,
          body: "Failed to retrive LOGS"
      }
  }
}

function timestampToDateAndTime(timestamp) {
  // Create a new Date object with the given timestamp
  const date = new Date(timestamp);

  // Extract the date part (YYYY-MM-DD)
  const datePart = date.toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
  });

  // Extract the time part (HH:MM:SS)
  const timePart = date.toLocaleTimeString('pl-PL', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
  });

  return {
      datePart,
      timePart
  };
}

function calculateHours(entranceTime, exitTime) {
  // Parse the entrance and exit time strings in 'HH:MM:SS' format
  let entranceDate = new Date(`1970-01-01T${entranceTime}Z`);
  let exitDate = new Date(`1970-01-01T${exitTime}Z`);

  // Calculate the difference in milliseconds and convert to hours
  let hoursWorked = (exitDate.getTime() - entranceDate.getTime()) / (1000 * 60 * 60);

  // Return the result rounded to 2 decimal places
  return Math.round(hoursWorked * 100) / 100;
}

interface DeviceCredentials {
  access_id: string;
  access_key: string;
  device_id: string;
  company: string;
}

interface Pracownicy {
  imie: string;
  nazwisko: string;
  FingerID: string;
  cardID: string;
}

interface LogEntry {
  date: string,
  type: string,
  entrence_time: string,
  exit_time: string, // No second punch
  hours: number
}

interface ChoosenLog {
  date: string,
  hour: string,
}

// To learn about scheduled functions and supported cron extensions,
// see: https://ntl.fyi/sched-func
export const handler = schedule('@hourly', async () => {
  try {
      await client.connect()
      console.log("Connection to database succesful")

  } catch (error) {
      console.log("Connection to database unsuccesful")
  }



  const db = client.db("login").collection("Devices")
  const Companies = await db.find < DeviceCredentials > ({}).toArray()
  //Tuya Getting Logs
  let current_time = new Date()
  for (const company of Companies) {
      let Logs = await TuyaGetLogs(company.device_id)
      let ConvertedLogs: {
          code: string,
          value: string,
          date: string,
          hour: string
      } [] = []
      ConvertedLogs = Logs.result.logs.map((log) => {
          let dateContent = timestampToDateAndTime(log.eventTime)
          return {
              code: log.code,
              value: log.value,
              date: dateContent.datePart,
              hour: dateContent.timePart
          }
      })
      let Pracownicy = await client.db(company.company).collection("PracownicyID").find < Pracownicy > ({}, {
          "_id": 0,
          "FingerID": 1,
          "cardID": 1,
          "imie": 1,
          "nazwisko": 1
      }).toArray()

      for (const pracownik of Pracownicy) {
          let Temp_Insert_List: ChoosenLog[] = []
          let insertList: LogEntry[] = []

          //Iterowanie po Logach
          for (const log in ConvertedLogs) {
              let threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
              let tempLogDate1 = ConvertedLogs[log].date.split(".")
              let tempLogDate2 = tempLogDate1[2] + "-" + tempLogDate1[1] + "-" + tempLogDate1[0]
              let logDate = new Date(tempLogDate2);
              if (threeDaysAgo.getTime() < logDate.getTime()) {
                  if ((ConvertedLogs == pracownik.FingerID || ConvertedLogs[log].value == pracownik.cardID)) {
                      let temp_dict = {
                          "date": ConvertedLogs[log].date,
                          "hour": ConvertedLogs[log].hour,
                      }
                      Temp_Insert_List.push(temp_dict)
                  }
              }
                Temp_Insert_List.sort((a, b) => {
                const dateA = new Date(a.date.split('.').reverse().join('-') + 'T' + a.hour);
                const dateB = new Date(b.date.split('.').reverse().join('-') + 'T' + b.hour);
                return dateA - dateB; // Ascending order
              });          
            }
          let entrence_time: ChoosenLog | undefined = undefined
          let exit_time: ChoosenLog | undefined = undefined
          let log_entry: LogEntry
          for (let i = 0; i < Temp_Insert_List.length; i++) {
            console.log(Temp_Insert_List[i])
              if (entrence_time === undefined) {
                console.log("1")
                  entrence_time = Temp_Insert_List[i]
                  if (i === Temp_Insert_List.length-1) {
                      // Filling in the correct entry into the database //Checking the last entry
                      if (entrence_time!.date === current_time.toISOString().split('T')[0]) { // The employee is present if the date is today
                          log_entry = {
                              date: Temp_Insert_List[i].date,
                              type: "o",
                              entrence_time: Temp_Insert_List[i].hour,
                              exit_time: "Obecny", // Present
                              hours: 0
                          };
                      } else { // Or the entry is invalid
                          log_entry = {
                              date: Temp_Insert_List[i].date,
                              type: "o",
                              entrence_time: Temp_Insert_List[i].hour,
                              exit_time: "Brak drugiego odbicia", // No second punch
                              hours: 0
                          };
                      }
                      // Add the log entry to the insertList
                      insertList.push(log_entry);

                      // Clear the entry and exit times for the next iteration
                      exit_time = undefined;
                      entrence_time = undefined;
                  }
              } else {
                    console.log("2")
                  let login_gap = (new Date(`1970-01-01T${entrence_time.hour}Z`).getTime() - new Date(`1970-01-01T${ConvertedLogs[i].hour}Z`).getTime() ) / 1000 / 60;
                  if (ConvertedLogs[i].date != entrence_time.date) {
                      if (i == Temp_Insert_List.length-1) {
                          entrence_time = Temp_Insert_List[i]
                          if (entrence_time.date == current_time.toISOString().split('T')[0]) {
                              log_entry = {
                                  "date": Temp_Insert_List[i].date,
                                  "type": "o",
                                  "entrence_time": entrence_time['time'],
                                  "exit_time": "Obecny",
                                  "hours": 0
                              }
                              insertList.push(log_entry)
                          } else {
                              log_entry = {
                                  "date": Temp_Insert_List[i].date,
                                  "type": "o",
                                  "entrence_time": entrence_time['time'],
                                  "exit_time": "Brak drugiego odbicia",
                                  "hours": 0
                              }
                              insertList.push(log_entry)
                          }
                      }
                      entrence_time = Temp_Insert_List[i]
                  } else if (login_gap > 2) {
                      exit_time = Temp_Insert_List[i]
                      let hours_worked = calculateHours(entrence_time.hour, exit_time.hour)

                      log_entry = {
                          "date": Temp_Insert_List[i].date,
                          "type": "o",
                          "entrence_time": entrence_time.hour,
                          "exit_time": exit_time.hour,
                          "hours": hours_worked
                      }
                      insertList.push(log_entry)
                      entrence_time = undefined
                      exit_time = undefined
                  } else {}
              }
          }

          let first: LogEntry | undefined;
          let second: LogEntry | undefined;
          for (const element of insertList) {
              if (element.hours != 0) {
                  if (first == undefined) {
                      first = element
                  } else {
                      second = element
                      if (second.date == first.date) {
                          let log_entry: {
                              date: string,
                              type: string,
                              entrence_time: string,
                              exit_time: string
                          } = {
                              "date": element['date'],
                              "type": "w",
                              "entrence_time": first['exit_time'],
                              "exit_time": second['entrence_time'],
                          }
                          insertList.push(log_entry)
                      }
                  }
              }
          }
          let collection_name = pracownik.imie + "_" + pracownik.nazwisko
          // Assuming the following:
          // 1. `insertList` is the list of documents to insert or update
          // 2. `db` is your MongoDB database instance
          // 3. `collectionName` is the name of the collection
          // 4. `employee` is equivalent to `pracownik` in Python
          // 5. `bulkWriteOps` and `insertActiveUsers` are arrays to store the bulk operations
          console.log(insertList)
          if (insertList.length !== 0) { // Check if insertList is not empty
              let bulkWriteOps = [];
              let insertActiveUsers = [];
              let Active = false;

              // Create bulk update operations based on type
              insertList.forEach((insert) => {
                  let tempInsert;
                  if (insert.type === "w") {
                      tempInsert = {
                          updateOne: {
                              filter: {
                                  date: insert.date,
                                  entrence_time: insert.entrence_time
                              },
                              update: {
                                  $set: {
                                      date: insert.date,
                                      type: insert.type,
                                      entrence_time: insert.entrence_time,
                                      exit_time: insert.exit_time
                                  }
                              },
                              upsert: true
                          }
                      };
                  } else {
                      tempInsert = {
                          updateOne: {
                              filter: {
                                  date: insert.date,
                                  entrence_time: insert.entrence_time
                              },
                              update: {
                                  $set: {
                                      date: insert.date,
                                      type: insert.type,
                                      entrence_time: insert.entrence_time,
                                      exit_time: insert.exit_time,
                                      hours: insert.hours
                                  }
                              },
                              upsert: true
                          }
                      };
                  }
                  bulkWriteOps.push(tempInsert);
              });

              // Checking for "Obecny" status
              insertList.forEach((element) => {
                  if (element.exit_time === "Obecny") {
                      let tempInsert = {
                          updateOne: {
                              filter: {
                                  imie: pracownik.imie,
                                  nazwisko: pracownik.nazwisko
                              },
                              update: {
                                  $set: {
                                      active: "Obecny"
                                  }
                              }
                          }
                      };

                      insertActiveUsers.push(tempInsert);
                      Active = true;
                  }
              });

              // If no "Obecny" status, set to "NieObecny"
              if (!Active) {
                  let tempInsert = {
                      updateOne: {
                          filter: {
                              imie: pracownik.imie,
                              nazwisko: pracownik.nazwisko
                          },
                          update: {
                              $set: {
                                  active: "NieObecny"
                              }
                          }
                      }
                  };
                  insertActiveUsers.push(tempInsert);
              }
              // Execute the bulk write operations
              const resoultBulkWrite = await client.db(company.company).collection(collection_name).bulkWrite(bulkWriteOps, {
                      ordered: false
                  })


              // Execute the bulk write for active users
              const resoultActiveUser = await client.db(company.company).collection('PracownicyID').bulkWrite(insertActiveUsers, {
                      ordered: false
                  })
              console.log(resoultActiveUser)
              console.log(resoultBulkWrite)
          }

      }

  }

  try {

      //DAtabase connection
      //Converting Logs to Human Readable form    
      return {
          statusCode: 200,
      }
  } catch (error) {
      console.log("Connection failed")
      return {
          statusCode: 408,
      }
  } finally {
      console.log("Connection Closed")
      client.close()
  }
})
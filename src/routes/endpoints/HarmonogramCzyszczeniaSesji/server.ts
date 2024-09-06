import { lucia } from "$lib/server/auth";
import type { Config } from "@netlify/functions";

export async (req:Request) => {
  try {
    await lucia.deleteExpiredSessions()
  } catch (error) {
    console.log("Error durng cleaning sesssions:", error)
  }
}

export const config: Config = {
  schedule: "@monthly"
}
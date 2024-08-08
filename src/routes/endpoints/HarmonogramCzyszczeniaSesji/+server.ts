import { CronJob } from "quirrel/sveltekit";
import { lucia } from "$lib/server/auth";

export default CronJob(
  "endpoints/HarmonogramCzyszczeniaSesji/+server.ts",
  ["0 2 * * *", "Europe/Berlin"],
  async () => {
    await lucia.deleteExpiredSessions();
  },
);

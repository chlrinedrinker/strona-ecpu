const { schedule } = require('@netlify/functions')

// To learn about scheduled functions and supported cron extensions,
// see: https://ntl.fyi/sched-func
module.exports.handler = schedule('@monthly', async (event) => {
  try {
    await lucia.deleteExpiredSessions()
    const eventBody = JSON.parse(event.body)
    console.log(`Next function run at ${eventBody.next_run}.`)
    return {
      statusCode: 200,
    }
  } catch (error) {
    console.log("Error durng cleaning sesssions:", error)
    return {
      statusCode: 503,
    }
  }
})

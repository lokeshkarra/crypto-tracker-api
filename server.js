const express = require("express");
const dotenv = require("dotenv");
const connectToDatabase = require("./src/config/db");

dotenv.config();

connectToDatabase();

const fetchCryptoData = require("./src/jobs/fetchCryptoData");
const app = express();

app.use(express.json());

const cron = require("node-cron");

// This runs every 2 hours
const task = cron.schedule("0 */2 * * *", async () => {
  try {
    await fetchCryptoData();
  } catch (error) {
    console.error("Error in scheduled task:", error);
  }
});
task.start();

const statsRouter = require("./src/routes/stats");
const deviationRouter = require("./src/routes/deviation");

app.use("/api", statsRouter);
app.use("/api", deviationRouter);

app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});

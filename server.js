const express = require("express");
const dotenv = require("dotenv");
const connectToDatabase = require("./src/config/db");
const statsRouter = require("./src/routes/stats");
const deviationRouter = require("./src/routes/deviation");
const cron = require("node-cron");

dotenv.config();

connectToDatabase();

const fetchCryptoData = require("./src/jobs/fetchCryptoData");
const app = express();

app.use(express.json());



// This runs every 2 hours
const task = cron.schedule("0 */2 * * *", async () => {
  try {
    await fetchCryptoData();
  } catch (error) {
    console.error("Error in scheduled task:", error);
  }
});
task.start();



app.use("/api", statsRouter);
app.use("/api", deviationRouter);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});

const mongoose = require("mongoose");

// MongoDB connection function
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Connection error:", error);
    process.exit(1); // Exit the process if the connection fails
  }
};

module.exports = connectToDatabase;

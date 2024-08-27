import mongoose from "mongoose";
import { onError } from "./requestLogger";

let count = 0;
mongoose.set("strictQuery", false);
mongoose.set("strictPopulate", false);

const dbConnectWithRetry = async () => {
  const dbURL = process.env.DB_URL as string;

  try {
    console.log("Attempting MongoDB connection (will retry if needed)");
    await mongoose.connect(dbURL, { dbName: "QirQuality" });
    console.log(`Database connected successfully to ${dbURL}...`);
  } catch (error) {
    const retrySeconds = 5;
    console.error(`MongoDB connection unsuccessful (will retry in #${count++} after ${retrySeconds} seconds)`, error);
    setTimeout(dbConnectWithRetry, retrySeconds * 1000);
    onError(error);
    process.exit(1);
  }
}

export default dbConnectWithRetry;
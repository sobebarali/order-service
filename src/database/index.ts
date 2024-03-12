import mongoose from "mongoose";
import config from "../configs";

export default async function connectDB() {
  try {
    await mongoose.connect(config.MONGO_URI, {
     autoIndex: false,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error connecting to the database", error);
    process.exit(1);
  }
}

import mongoose from "mongoose";
import 'dotenv/config';

const mongoUrl : string|undefined = process.env.MONGO_URL;

if (!mongoUrl) {
  throw new Error("FATAL ERROR: MONGO_URL environment variable is missing.");
}

export const connectDb = async () => {
    await mongoose.connect(mongoUrl!);
    console.log("connected to the database ...");
}
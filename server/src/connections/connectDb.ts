import mongoose from "mongoose";
import logger from "../utils/logger";

const mongoDbUri = process.env.MONGODB_URI as string;

export const connectDb = async () => {
  try {
    await mongoose.connect(mongoDbUri);
    logger.info("Connected to database");
  } catch (err) {
    logger.error(`Error connecting to database: ${err}`);
    process.exit(1);
  }
};

export default connectDb;

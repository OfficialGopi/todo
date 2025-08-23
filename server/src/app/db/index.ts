import { env } from "./../../env";
import { logger } from "./../../logger";
import mongoose from "mongoose";

async function connectDB() {
  try {
    //CONNECT TO MONGODB
    await mongoose.connect(env.DATABASE_URL);
    logger.info("========= MONGODB CONNECTION SUCCESSFUL =========");
  } catch (error) {
    logger.error(`## MONGODB CONNECTION ERROR : ${error}  ##`);
    process.exit(1); // Exit if connection fails
  }
}

export { connectDB };

import { Application } from "express";
import { connectDB } from "./app/db/index";
import http from "http";
import { env } from "./env";
import { logger } from "./logger";
import { createApp } from "./app";

async function main(createApp: () => Application) {
  try {
    // CONNECT TO MONGODB
    await connectDB();

    const PORT = Number(env.PORT) ?? 8000;
    // CREATE HTTP SEVER
    const server = http.createServer(createApp());

    // LISTEN TO PORT
    server.listen(PORT, () => {
      logger.info(`=========  SERVER IS RUNNING ON PORT : ${PORT}  =========`);
    });
  } catch (error) {
    logger.error(`## ERROR WHILE SERVER STARTING : ${error} ##`);
    process.exit(1); //EXIT IF OCCURS
  }
}

main(createApp);

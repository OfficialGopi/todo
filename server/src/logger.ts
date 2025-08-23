import winston from "winston";

// =============  Creating Logger ==================

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

export { logger };

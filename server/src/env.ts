import dotenv from "dotenv";
import { logger } from "./logger";
import z from "zod";

//CONFIGURING ENV VARIABLES
dotenv.config({
  path: "./.env",
});

function validateEnv(env: NodeJS.ProcessEnv) {
  //MAKING ZOD SCHEMA FOR ENV VALIDATION
  const object = z.object({
    //  SERVER ENVIRONMENT
    NODE_ENV: z.string().default("development"),

    //PORT
    PORT: z.coerce.number().optional(),

    //DATABASE_URL
    DATABASE_URL: z.string(),

    //  FRONTEND ORIGIN FROM WHERE SHOULD THE REQUESTS COME
    ORIGIN: z.string(),

    //  SERVER URL
    BASE_URL: z.string(),

    //  CLOUDINARY VARIABLES
    CLOUDINARY_SECRET: z.string(),
    CLOUDINARY_KEY: z.string(),
    CLOUDINARY_NAME: z.string(),

    //  MAILTRAP VARIABLES
    MAILTRAP_HOST: z.string(),
    MAILTRAP_PORT: z.coerce.number(),
    MAILTRAP_USER: z.string(),
    MAILTRAP_PASSWORD: z.string(),
    MAILTRAP_SENDER_EMAIL: z.string(),

    //  JWT TOKEN ENV VARIABLESs
    ACCESS_TOKEN_SECRET: z.string(),
    ACCESS_TOKEN_EXPIRY: z.string(),
    REFRESH_TOKEN_SECRET: z.string(),
    REFRESH_TOKEN_EXPIRY: z.string(),
  });

  const { data, success, error } = object.safeParse(env);

  if (!success) {
    logger.error(
      `## INVALID ENVIRONMENT VARIABLES PARSING :  ${error.name}   ##`,
    );

    throw new Error(
      `## INVALID ENVIRONMENT VARIABLES PARSING :  ${error.name}   ##`,
    );
  }

  return data;
}

//PARSING ENV VARIABLES
const env = validateEnv(process.env);

export { env };

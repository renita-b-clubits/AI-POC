import * as dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

export const toBoolean = (secure: unknown) =>
  String(secure).toLowerCase() === "true";

export const envVariables = z.object({
  PORT: z.preprocess(Number, z.number()),
  JWT_SECRET: z.string(),
  DATABASE_URL: z.string(),
  COOKIE_SECURE: z.preprocess(toBoolean, z.boolean()),
  COOKIE_HTTP_ONLY: z.preprocess(toBoolean, z.boolean()),
  COOKIE_SAME_SITE: z.preprocess(toBoolean, z.boolean()),
  AZURE_BLOB_STORAGE_KEY: z.string(),
  AZURE_BLOB_ACCOUNT_NAME: z.string(),
  AZURE_EMAIL_SERVICE_ACCESS_KEY: z.string(),
  AZURE_EMAIL_SERVICE_ENDPOINT: z.string(),
  AZURE_EMAIL_SERVICE_SENDER_ADDRESS: z.string(),
  BCRYPT_SALT_ROUNDS: z.preprocess(Number, z.number()),
  DARWINBOX_BASE_URL: z.string(),
  DARWINBOX_API_KEY: z.string(),
  DARWINBOX_DATASET_KEY: z.string(),
  DARWINBOX_AUTHORIZATION: z.string(),
  AZURE_COMPUTER_VISION_ENDPOINT: z.string(),
  AZURE_COMPUTER_VISION_API_KEY: z.string(),
  // FACEBOOK_CLIENT_ID: z.string(),
  // FACEBOOK_SECRET_ID: z.string(),
});

declare global {
  export namespace NodeJS {
    export interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}

export default envVariables.parse(process.env);

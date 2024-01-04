import { PrismaClient } from "database";
import env from "../environment/variables";

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: env.DATABASE_URL,
    },
  },
});

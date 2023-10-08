import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default {
  schema: "./src/server/db/schema.ts",
  out: "./drizzle",
  driver: 'better-sqlite',
  dbCredentials: {
    url: "sqlite.db"
  }
} satisfies Config;
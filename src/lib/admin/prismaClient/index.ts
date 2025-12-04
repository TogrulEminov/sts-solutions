import { PrismaClient } from "@/src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

declare global {
  var prisma: PrismaClient | undefined;
}

const createPrismaClient = () => {
  // Runtime üçün pooled connection istifadə edin
  const connectionString =
    process.env.DATABASE_URL_POOL || process.env.DATABASE_URL;

  const pool = new Pool({
    connectionString,
    // PgBouncer üçün optimal settings
    max: 20, // connection sayı
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });

  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
};

export const db = globalThis.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

// Graceful shutdown
if (typeof window === "undefined") {
  process.on("beforeExit", async () => {
    await db.$disconnect();
  });
}

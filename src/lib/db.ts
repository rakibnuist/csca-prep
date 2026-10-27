import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Copy .env.example to .env.local and run `npm run setup`.",
  );
}

/**
 * The local development database (PGlite wire server) accepts a single
 * connection at a time, so we pin the pool to one connection. Managed
 * Postgres in production gets a normal pool.
 */
const isEmbedded = /127\.0\.0\.1|localhost/.test(connectionString) && /:55432/.test(connectionString);
const poolMax = Number(process.env.PG_POOL_MAX ?? (isEmbedded ? 1 : 10));

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  pgPool?: Pool;
};

const pool =
  globalForPrisma.pgPool ??
  new Pool({
    connectionString,
    max: poolMax,
    idleTimeoutMillis: isEmbedded ? 0 : 30_000,
    keepAlive: true,
  });

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg(pool),
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

/**
 * Cache unconditionally. In production each route bundle is a separate module
 * instance, so without this every route would open its own pool — fatal against
 * a single-connection embedded database and wasteful against managed Postgres.
 */
globalForPrisma.prisma = prisma;
globalForPrisma.pgPool = pool;

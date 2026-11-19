/**
 * Local development database.
 *
 * CSCA Master runs on PostgreSQL in production. For local development we boot a
 * real Postgres-compatible engine (PGlite) and expose it over the Postgres wire
 * protocol, so Prisma, SQL and every production query behave identically with
 * zero installation.
 *
 *   npm run db          # start the wire server (foreground)
 *   npm run dev         # starts this automatically, then Next.js
 */
import { PGlite } from '@electric-sql/pglite';
import { PGLiteSocketServer } from '@electric-sql/pglite-socket';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

const PORT = Number(process.env.PGLITE_PORT ?? 55432);
const HOST = '127.0.0.1';
const DATA_DIR = process.env.PGLITE_DIR ?? path.join(process.cwd(), '.pglite');

mkdirSync(DATA_DIR, { recursive: true });

const db = await PGlite.create(DATA_DIR);

/**
 * PGlite serves one engine, but many clients can share it: the socket server
 * queues each statement and keeps a transaction pinned to the handler that
 * opened it. The default of 1 connection makes the dev server fight with any
 * second client (Prisma CLI, `prisma db push`, a seed script, psql), and the
 * loser sees "Connection terminated unexpectedly". Allow a small pool instead.
 */
const MAX_CONNECTIONS = Number(process.env.PGLITE_MAX_CONNECTIONS ?? 20);
const server = new PGLiteSocketServer({
  db,
  port: PORT,
  host: HOST,
  maxConnections: MAX_CONNECTIONS,
});

await server.start();
console.log(`[db] Postgres-compatible server ready on postgresql://postgres@${HOST}:${PORT}/postgres`);
console.log(`[db] data directory: ${DATA_DIR}`);

const shutdown = async () => {
  try {
    await server.stop();
    await db.close();
  } finally {
    process.exit(0);
  }
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

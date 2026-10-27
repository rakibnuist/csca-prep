/**
 * One command to run CSCA Master locally:
 *   npm run dev
 *
 * 1. Boots the embedded Postgres-compatible database (unless DATABASE_URL points elsewhere).
 * 2. Waits for it to accept connections.
 * 3. Starts the Next.js dev server.
 */
import { spawn } from 'node:child_process';
import net from 'node:net';
import fs from 'node:fs';
import path from 'node:path';

// Minimal .env loader (Next loads .env itself, but we need DATABASE_URL here first).
for (const file of ['.env.local', '.env']) {
  const full = path.join(process.cwd(), file);
  if (!fs.existsSync(full)) continue;
  for (const line of fs.readFileSync(full, 'utf8').split('\n')) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (!match || process.env[match[1]]) continue;
    process.env[match[1]] = match[2].replace(/^["']|["']$/g, '');
  }
}

const url = process.env.DATABASE_URL ?? '';
const isLocalPglite = /127\.0\.0\.1|localhost/.test(url) && /:55432/.test(url);
const port = Number(process.env.PGLITE_PORT ?? 55432);

function canConnect(port, host = '127.0.0.1') {
  return new Promise((resolve) => {
    const socket = net.connect({ port, host });
    socket.setTimeout(400);
    socket.once('connect', () => { socket.destroy(); resolve(true); });
    socket.once('error', () => resolve(false));
    socket.once('timeout', () => { socket.destroy(); resolve(false); });
  });
}

async function waitFor(port, tries = 80) {
  for (let i = 0; i < tries; i++) {
    if (await canConnect(port)) return true;
    await new Promise((r) => setTimeout(r, 250));
  }
  return false;
}

let dbProcess;
if (isLocalPglite) {
  if (await canConnect(port)) {
    console.log('[dev] database already running on port', port);
  } else {
    dbProcess = spawn(process.execPath, ['scripts/dev-db.mjs'], { stdio: 'inherit', env: process.env });
    const ready = await waitFor(port);
    if (!ready) {
      console.error('[dev] database failed to start');
      process.exit(1);
    }
  }
} else if (url) {
  console.log('[dev] using external DATABASE_URL');
} else {
  console.error('[dev] DATABASE_URL is not set. Copy .env.example to .env.local first.');
  process.exit(1);
}

const next = spawn(process.execPath, [path.join('node_modules', 'next', 'dist', 'bin', 'next'), 'dev', ...process.argv.slice(2)], {
  stdio: 'inherit',
  env: process.env,
});

const stop = async (code = 0) => {
  next.kill('SIGTERM');
  if (dbProcess) dbProcess.kill('SIGTERM');
  setTimeout(() => process.exit(code), 300);
};

next.on('exit', (code) => stop(code ?? 0));
process.on('SIGINT', () => stop(0));
process.on('SIGTERM', () => stop(0));

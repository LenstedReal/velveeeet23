#!/usr/bin/env node
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";

const kids = [];

function run(cmd, args, { cwd = process.cwd(), env = {} } = {}) {
  const child = spawn(cmd, args, {
    cwd,
    env: { ...process.env, ...env },
    stdio: "inherit",
  });
  kids.push(child);
  child.on("exit", (code, signal) => {
    if (signal) return;
    if (code && code !== 0) {
      console.error(`[dev-velvet] ${cmd} exited ${code}`);
      shutdown(code);
    }
  });
  return child;
}

function shutdown(code = 0) {
  for (const child of kids) {
    try { child.kill("SIGTERM"); } catch { /* ignore */ }
  }
  process.exit(code);
}

process.on("SIGTERM", () => shutdown(0));
process.on("SIGINT", () => shutdown(0));

const python = existsSync("/workspace/.venv/bin/python")
  ? "/workspace/.venv/bin/python"
  : "python3";

run(python, ["-m", "uvicorn", "server:app", "--host", "127.0.0.1", "--port", "8000", "--app-dir", "backend"], {
  cwd: "/workspace",
});

run("npx", ["next", "dev", "--hostname", "0.0.0.0", "--port", "8080"], {
  cwd: "/workspace",
  env: {
    HOSTNAME: "0.0.0.0",
    PORT: "8080",
    NEXT_TELEMETRY_DISABLED: "1",
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || "",
  },
});

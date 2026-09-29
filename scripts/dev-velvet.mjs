#!/usr/bin/env node
/**
 * Start FastAPI (8000) + CRA frontend (8080) together for live preview.
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";

const kids = [];

function run(cmd, args, { cwd, env } = {}) {
  const child = spawn(cmd, args, {
    cwd,
    env: { ...process.env, ...env },
    stdio: "inherit",
  });
  kids.push(child);
  child.on("exit", (code, signal) => {
    if (signal) return;
    if (code && code !== 0) {
      console.error(`[dev-velvet] ${cmd} ${args.join(" ")} exited ${code}`);
      shutdown(code);
    }
  });
  return child;
}

function shutdown(code = 0) {
  for (const child of kids) {
    try {
      child.kill("SIGTERM");
    } catch {
      /* ignore */
    }
  }
  process.exit(code);
}

process.on("SIGTERM", () => shutdown(0));
process.on("SIGINT", () => shutdown(0));

const python = existsSync("/workspace/.venv/bin/python")
  ? "/workspace/.venv/bin/python"
  : "python3";

run(python, ["-m", "uvicorn", "server:app", "--host", "127.0.0.1", "--port", "8000"], {
  cwd: "/workspace/backend",
});

run("npm", ["start"], {
  cwd: "/workspace/frontend",
  env: {
    ESLINT_NO_DEV_ERRORS: "true",
    BROWSER: "none",
    HOST: "0.0.0.0",
    PORT: "8080",
    DANGEROUSLY_DISABLE_HOST_CHECK: "true",
    WDS_SOCKET_PORT: "0",
    CHOKIDAR_USEPOLLING: "true",
    REACT_APP_BACKEND_URL: process.env.REACT_APP_BACKEND_URL || "",
    VELVET_API_ORIGIN: process.env.VELVET_API_ORIGIN || "http://127.0.0.1:8000",
    CI: "true",
  },
});

#!/usr/bin/env node

/**
 * Script to copy .env files and start standalone server
 * Used by PM2 to ensure .env files are in place before starting
 */

const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const projectRoot = process.cwd();
const standaloneDir = path.join(projectRoot, ".next", "standalone");
const envFiles = [".env", ".env.local", ".env.production", ".env.production.local"];

// Copy .env files to standalone if they exist
if (fs.existsSync(standaloneDir)) {
  console.log(`[${new Date().toISOString()}] 📋 Copying environment files to standalone build...`);

  let copiedCount = 0;
  envFiles.forEach((envFile) => {
    const sourcePath = path.join(projectRoot, envFile);
    const destPath = path.join(standaloneDir, envFile);

    if (fs.existsSync(sourcePath)) {
      try {
        fs.copyFileSync(sourcePath, destPath);
        console.log(`[${new Date().toISOString()}] ✅ Copied ${envFile}`);
        copiedCount++;
      } catch (error) {
        console.error(`[${new Date().toISOString()}] ❌ Failed to copy ${envFile}:`, error.message);
      }
    }
  });

  if (copiedCount > 0) {
    console.log(`[${new Date().toISOString()}] ✅ Copied ${copiedCount} environment file(s) to standalone`);
  } else {
    console.log(`[${new Date().toISOString()}] ⚠️  No .env files found in project root`);
  }

  // Copy static directory to standalone build (required for images and static assets)
  const staticSource = path.join(projectRoot, ".next", "static");
  const staticDest = path.join(standaloneDir, ".next", "static");

  if (fs.existsSync(staticSource) && !fs.existsSync(staticDest)) {
    try {
      // Create .next directory in standalone if it doesn't exist
      const standaloneNextDir = path.join(standaloneDir, ".next");
      if (!fs.existsSync(standaloneNextDir)) {
        fs.mkdirSync(standaloneNextDir, { recursive: true });
      }

      // Recursive copy function
      const copyRecursiveSync = (src, dest) => {
        const exists = fs.existsSync(src);
        const stats = exists && fs.statSync(src);
        const isDirectory = exists && stats.isDirectory();
        if (isDirectory) {
          if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
          }
          fs.readdirSync(src).forEach((childItemName) => {
            copyRecursiveSync(
              path.join(src, childItemName),
              path.join(dest, childItemName)
            );
          });
        } else {
          fs.copyFileSync(src, dest);
        }
      };

      copyRecursiveSync(staticSource, staticDest);
      console.log(`[${new Date().toISOString()}] ✅ Copied static files to standalone build`);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] ❌ Failed to copy static files:`, error.message);
    }
  } else if (fs.existsSync(staticDest)) {
    console.log(`[${new Date().toISOString()}] ℹ️  Static directory already exists in standalone build`);
  } else if (!fs.existsSync(staticSource)) {
    console.warn(`[${new Date().toISOString()}] ⚠️  Static source directory not found: ${staticSource}`);
  }
} else {
  console.log(`[${new Date().toISOString()}] ⚠️  Standalone directory not found, skipping .env copy`);
}

// Start the standalone server
const serverPath = path.join(standaloneDir, "server.js");

if (!fs.existsSync(serverPath)) {
  console.error(`[${new Date().toISOString()}] ❌ Error: ${serverPath} not found!`);
  process.exit(1);
}

console.log(`[${new Date().toISOString()}] 🚀 Starting standalone server...`);

// Spawn the server process and forward all signals
const server = spawn("node", [serverPath], {
  stdio: "inherit",
  cwd: projectRoot,
  env: process.env,
});

server.on("error", (error) => {
  console.error(`[${new Date().toISOString()}] ❌ Failed to start server:`, error);
  process.exit(1);
});

server.on("exit", (code, signal) => {
  if (signal) {
    console.log(`[${new Date().toISOString()}] Server stopped by signal: ${signal}`);
  } else {
    console.log(`[${new Date().toISOString()}] Server exited with code: ${code}`);
  }
  process.exit(code || 0);
});

// Forward signals to the server process
process.on("SIGTERM", () => {
  server.kill("SIGTERM");
});

process.on("SIGINT", () => {
  server.kill("SIGINT");
});

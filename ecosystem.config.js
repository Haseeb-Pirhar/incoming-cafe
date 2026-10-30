require("dotenv").config();

const fs = require("fs");
const path = require("path");

const PROJECT_NAME = process.env.PROJECT_NAME || "proj";
const MODE = process.env.MODE || "web-stag";
const PORT = process.env.PORT || 8002;

// Check if standalone build exists
const standalonePath = path.join(process.cwd(), ".next", "standalone", "server.js");
const useStandalone = fs.existsSync(standalonePath);
const standaloneScript = path.join(process.cwd(), "scripts", "start-standalone.js");

module.exports = {
  apps: [
    {
      name: `${PROJECT_NAME}-${MODE}`,
      // Use standalone server if available (with .env copy), otherwise fall back to next start
      script: useStandalone ? "node" : "next",
      args: useStandalone ? [standaloneScript] : "start",
      env: {
        PORT,
        NODE_ENV: "production",
        NODE_OPTIONS: "--max-old-space-size=2048",
      },
      autorestart: true,
      error_file: "./logs/pm2/error.log",
      out_file: "./logs/pm2/out.log",
      log_file: "./logs/pm2/combined.log",
      time: true,
      exec_mode: "fork",
      watch: false,
      max_memory_restart: "4G",
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss",
    },
    {
      name: `${PROJECT_NAME}-${MODE}-cronjob`,
      script: "./scripts/cronjob.sh",
      cron_restart: "*/10 * * * *",
      autorestart: false,
    },
  ],
  deploy: {
    production: {
      "post-deploy":
        "npm ci && NODE_OPTIONS='--max-old-space-size=1536' npm run build && pm2 reload ecosystem.config.js --env production",
    },
  },
};

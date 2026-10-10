// Basic express app setup
const fs = require("node:fs");
const path = require("node:path");
const dotenv = require("dotenv");
const baseEnvPath = path.join(__dirname, ".env");
const baseEnvironment = fs.existsSync(baseEnvPath)
  ? dotenv.parse(fs.readFileSync(baseEnvPath)).NODE_ENV
  : undefined;
const environment = process.env.NODE_ENV || baseEnvironment || "development";
const environmentFiles = {
  development: "dev.env",
  production: "prod.env",
  staging: "staging.env",
};
const environmentFile = environmentFiles[environment] || `${environment}.env`;

dotenv.config({
  path: [path.join(__dirname, environmentFile), baseEnvPath],
});

const express = require("express");
const app = express();
const port = process.env.PORT || 9090;

app.get("/", (req, res) => {
  res.json({ message: `Hello, World! Environment: ${environment}` });
});

app.listen(port, () => {
  console.log(`Environment: ${environment || "default"}`);
  console.log(`Loading environment variables from: ${environmentFile}`);
  console.log(`Server is running on http://localhost:${port}`);
});

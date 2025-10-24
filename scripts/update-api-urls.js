#!/usr/bin/env node

/**
 * Script to update API URLs in frontend for deployment
 * Usage: node scripts/update-api-urls.js <backend-url>
 * Example: node scripts/update-api-urls.js https://trashfun-backend-abc.onrender.com
 */

const fs = require("fs");
const path = require("path");

const backendUrl = process.argv[2];

if (!backendUrl) {
  console.error("❌ Please provide backend URL");
  console.log("Usage: node scripts/update-api-urls.js <backend-url>");
  console.log(
    "Example: node scripts/update-api-urls.js https://trashfun-backend-abc.onrender.com"
  );
  process.exit(1);
}

const appTsxPath = path.join(__dirname, "..", "frontend", "src", "App.tsx");

try {
  let content = fs.readFileSync(appTsxPath, "utf8");

  // Replace localhost URLs with production URL
  content = content.replace(
    /http:\/\/localhost:5000/g,
    backendUrl.replace(/\/$/, "") // Remove trailing slash
  );

  fs.writeFileSync(appTsxPath, content);

  console.log("✅ Successfully updated API URLs in App.tsx");
  console.log(`🔗 Backend URL set to: ${backendUrl}`);
} catch (error) {
  console.error("❌ Error updating API URLs:", error.message);
  process.exit(1);
}

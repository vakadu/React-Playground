const fs = require("fs");
const path = require("path");

const BASE_DIR = path.join(__dirname, "src", "app");

function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      processDirectory(fullPath); // Recurse deeper
    }

    if (entry.isFile() && (entry.name === "index.js" || entry.name === "index.jsx")) {
      const ext = path.extname(entry.name); // .js or .jsx
      const newPath = path.join(dirPath, `page${ext}`);

      let content = fs.readFileSync(fullPath, "utf-8");

      if (!content.startsWith('"use client"') && !content.startsWith("'use client'")) {
        content = `"use client";\n\n${content}`;
      }

      fs.writeFileSync(newPath, content);
      fs.unlinkSync(fullPath);

      console.log(`✅ Converted: ${fullPath} → ${newPath}`);
    }
  }
}

// Start the traversal
if (fs.existsSync(BASE_DIR)) {
  processDirectory(BASE_DIR);
} else {
  console.error("❌ Directory not found: src/app");
}

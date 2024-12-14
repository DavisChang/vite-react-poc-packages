const fs = require("fs");
const path = require("path");

const distPath = path.join(__dirname, "dist");
const indexHtmlPath = path.join(distPath, "index.html");

// Replace placeholders in index.html
const injectEnv = () => {
  const runtimeEnv = {
    API_ENDPOINT: process.env.API_ENDPOINT || "https://default.api",
    LOG_LEVEL: process.env.LOG_LEVEL || "info",
  };

  const indexHtmlContent = fs.readFileSync(indexHtmlPath, "utf-8");

  const updatedHtml = indexHtmlContent.replace(
    /<script id="env-script">window\.__ENV__ = \{\};<\/script>/,
    `<script id="env-script">
      window.__ENV__ = ${JSON.stringify(runtimeEnv)};
    </script>`
  );

  fs.writeFileSync(indexHtmlPath, updatedHtml, "utf-8");
};

injectEnv();

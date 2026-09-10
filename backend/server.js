const jsonServer = require("json-server");
const path = require("path");
const fs = require("fs");

const server = jsonServer.create();
const dbPath = path.join(__dirname, "db.json");
const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 3000;

// CORS headers for all incoming requests
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// JSON Server default middlewares (logger, static, cors, no-cache)
server.use(middlewares);

// Support both /api/... and direct /... endpoints for JSON data
server.use("/api", router);

const distPath = path.join(__dirname, "..", "dist");
const hasDist = fs.existsSync(distPath);

if (hasDist) {
  // Serve static assets from dist
  const express = require("express");
  server.use(express.static(distPath));

  // If a browser asks for an HTML page (like /products, /services, /cart), serve index.html
  server.use((req, res, next) => {
    const isHtmlRequest =
      req.method === "GET" &&
      req.headers.accept &&
      req.headers.accept.includes("text/html");

    if (isHtmlRequest) {
      return res.sendFile(path.join(distPath, "index.html"));
    }
    next();
  });
}

// Route API requests to json-server router
server.use(router);

// SPA fallback for any unmatched GET request when dist is present
if (hasDist) {
  server.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

server.listen(PORT, "0.0.0.0", () => {
  console.log(`PetCareHub server running on port ${PORT}`);
});
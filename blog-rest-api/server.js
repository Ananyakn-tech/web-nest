const express = require("express");
const logger = require("./middleware/logger");
const postsRouter = require("./routes/posts");

const app = express();
const PORT = process.env.PORT || 3001;

// ── Global Middleware ──────────────────────────────
app.use(express.json());                    // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(logger);                            // Request logger

// ── CORS Headers (for browser testing) ────────────
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

// ── Routes ─────────────────────────────────────────
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Blog REST API!",
    version: "1.0.0",
    endpoints: {
      "GET    /api/posts":          "Retrieve all blog posts",
      "GET    /api/posts/:id":      "Retrieve a single post by ID",
      "POST   /api/posts":          "Create a new blog post",
      "PUT    /api/posts/:id":      "Update an existing blog post",
      "DELETE /api/posts/:id":      "Delete a blog post",
    },
    queryParams: {
      "GET /api/posts?category=X":  "Filter by category",
      "GET /api/posts?author=X":    "Filter by author",
      "GET /api/posts?search=X":    "Search in title & content",
    },
  });
});

app.use("/api/posts", postsRouter);

// ── 404 Handler ────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route '${req.method} ${req.originalUrl}' not found.`,
  });
});

// ── Global Error Handler ───────────────────────────
app.use((err, req, res, next) => {
  console.error("\x1b[31m[Error]\x1b[0m", err.message);
  res.status(500).json({
    success: false,
    message: "Internal Server Error.",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// ── Start Server ───────────────────────────────────
app.listen(PORT, () => {
  console.log("\n\x1b[32m✓\x1b[0m Blog REST API is running!");
  console.log(`\x1b[36m→\x1b[0m http://localhost:${PORT}`);
  console.log(`\x1b[36m→\x1b[0m API Base: http://localhost:${PORT}/api/posts`);
  console.log("\x1b[90mPress Ctrl+C to stop.\x1b[0m\n");
});

module.exports = app;

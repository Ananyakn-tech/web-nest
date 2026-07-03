const express = require("express");
const router = express.Router();
const db = require("../data/posts");
const { validatePost, validateUpdate, validateId } = require("../middleware/validate");

// ─────────────────────────────────────────────
// GET /api/posts
// Retrieve all blog posts (supports ?category & ?author filters)
// ─────────────────────────────────────────────
router.get("/", (req, res) => {
  let posts = db.getAll();
  const { category, author, search } = req.query;

  if (category) {
    posts = posts.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (author) {
    posts = posts.filter(
      (p) => p.author.toLowerCase() === author.toLowerCase()
    );
  }

  if (search) {
    const q = search.toLowerCase();
    posts = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q)
    );
  }

  return res.status(200).json({
    success: true,
    message: "Blog posts retrieved successfully.",
    count: posts.length,
    data: posts,
  });
});

// ─────────────────────────────────────────────
// GET /api/posts/:id
// Retrieve a single blog post by ID
// ─────────────────────────────────────────────
router.get("/:id", validateId, (req, res) => {
  const post = db.getById(req.postId);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: `Blog post with ID ${req.postId} not found.`,
    });
  }

  return res.status(200).json({
    success: true,
    message: "Blog post retrieved successfully.",
    data: post,
  });
});

// ─────────────────────────────────────────────
// POST /api/posts
// Create a new blog post
// ─────────────────────────────────────────────
router.post("/", validatePost, (req, res) => {
  const { title, content, author, category } = req.body;
  const post = db.create({ title, content, author, category });

  return res.status(201).json({
    success: true,
    message: "Blog post created successfully.",
    data: post,
  });
});

// ─────────────────────────────────────────────
// PUT /api/posts/:id
// Update an existing blog post (full or partial)
// ─────────────────────────────────────────────
router.put("/:id", validateId, validateUpdate, (req, res) => {
  const existing = db.getById(req.postId);

  if (!existing) {
    return res.status(404).json({
      success: false,
      message: `Blog post with ID ${req.postId} not found.`,
    });
  }

  const { title, content, author, category } = req.body;
  const updatedFields = {};
  if (title !== undefined) updatedFields.title = title.trim();
  if (content !== undefined) updatedFields.content = content.trim();
  if (author !== undefined) updatedFields.author = author.trim();
  if (category !== undefined) updatedFields.category = category.trim();

  const updated = db.update(req.postId, updatedFields);

  return res.status(200).json({
    success: true,
    message: "Blog post updated successfully.",
    data: updated,
  });
});

// ─────────────────────────────────────────────
// DELETE /api/posts/:id
// Delete a blog post
// ─────────────────────────────────────────────
router.delete("/:id", validateId, (req, res) => {
  const existing = db.getById(req.postId);

  if (!existing) {
    return res.status(404).json({
      success: false,
      message: `Blog post with ID ${req.postId} not found.`,
    });
  }

  db.remove(req.postId);

  return res.status(200).json({
    success: true,
    message: `Blog post with ID ${req.postId} deleted successfully.`,
    data: null,
  });
});

module.exports = router;

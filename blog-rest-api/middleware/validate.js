// Input validation middleware

const validatePost = (req, res, next) => {
  const { title, content } = req.body;
  const errors = [];

  if (!title || typeof title !== "string" || title.trim().length === 0) {
    errors.push("'title' is required and must be a non-empty string.");
  } else if (title.trim().length > 200) {
    errors.push("'title' must not exceed 200 characters.");
  }

  if (!content || typeof content !== "string" || content.trim().length === 0) {
    errors.push("'content' is required and must be a non-empty string.");
  } else if (content.trim().length > 10000) {
    errors.push("'content' must not exceed 10,000 characters.");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed.",
      errors,
    });
  }

  next();
};

const validateUpdate = (req, res, next) => {
  const { title, content, author, category } = req.body;
  const errors = [];

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Request body cannot be empty. Provide at least one field to update.",
      errors: ["No fields provided for update."],
    });
  }

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim().length === 0) {
      errors.push("'title' must be a non-empty string.");
    } else if (title.trim().length > 200) {
      errors.push("'title' must not exceed 200 characters.");
    }
  }

  if (content !== undefined) {
    if (typeof content !== "string" || content.trim().length === 0) {
      errors.push("'content' must be a non-empty string.");
    } else if (content.trim().length > 10000) {
      errors.push("'content' must not exceed 10,000 characters.");
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed.",
      errors,
    });
  }

  next();
};

const validateId = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID. ID must be a positive integer.",
    });
  }
  req.postId = id;
  next();
};

module.exports = { validatePost, validateUpdate, validateId };

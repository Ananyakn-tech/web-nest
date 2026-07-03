# Blog REST API — Minor Project 06

A RESTful API for managing blog posts, built with **Node.js** and **Express.js**.

## Tech Stack
- Node.js
- Express.js
- JavaScript (ES6+)
- JSON (in-memory data store)

## Getting Started

```bash
# Install dependencies
npm install

# Start the server
npm start

# Server runs at http://localhost:3001
```

---

## API Endpoints

### Base URL: `http://localhost:3001/api/posts`

| Method | Endpoint          | Description                  |
|--------|-------------------|------------------------------|
| GET    | `/api/posts`      | Retrieve all blog posts      |
| GET    | `/api/posts/:id`  | Retrieve a single post by ID |
| POST   | `/api/posts`      | Create a new blog post       |
| PUT    | `/api/posts/:id`  | Update an existing post      |
| DELETE | `/api/posts/:id`  | Delete a blog post           |

---

## Request & Response Examples

### GET /api/posts
```
GET http://localhost:3001/api/posts
```
**Response 200:**
```json
{
  "success": true,
  "message": "Blog posts retrieved successfully.",
  "count": 3,
  "data": [ { "id": 1, "title": "...", ... } ]
}
```

**Query Params:**
- `?category=Technology` — filter by category
- `?author=Ananya` — filter by author
- `?search=express` — search in title & content

---

### GET /api/posts/:id
```
GET http://localhost:3001/api/posts/1
```
**Response 200:**
```json
{
  "success": true,
  "message": "Blog post retrieved successfully.",
  "data": { "id": 1, "title": "Getting Started with Node.js", ... }
}
```
**Response 404:**
```json
{ "success": false, "message": "Blog post with ID 99 not found." }
```

---

### POST /api/posts
```
POST http://localhost:3001/api/posts
Content-Type: application/json

{
  "title": "My New Blog Post",
  "content": "This is the content of the post.",
  "author": "Ananya",
  "category": "Technology"
}
```
**Required:** `title`, `content`  
**Optional:** `author` (default: Anonymous), `category` (default: General)

**Response 201:**
```json
{
  "success": true,
  "message": "Blog post created successfully.",
  "data": { "id": 4, "title": "My New Blog Post", ... }
}
```

---

### PUT /api/posts/:id
```
PUT http://localhost:3001/api/posts/1
Content-Type: application/json

{
  "title": "Updated Title",
  "category": "Backend"
}
```
**Response 200:**
```json
{
  "success": true,
  "message": "Blog post updated successfully.",
  "data": { "id": 1, "title": "Updated Title", ... }
}
```

---

### DELETE /api/posts/:id
```
DELETE http://localhost:3001/api/posts/1
```
**Response 200:**
```json
{
  "success": true,
  "message": "Blog post with ID 1 deleted successfully.",
  "data": null
}
```

---

## HTTP Status Codes Used

| Code | Meaning                  |
|------|--------------------------|
| 200  | OK                       |
| 201  | Created                  |
| 204  | No Content (CORS)        |
| 400  | Bad Request (Validation) |
| 404  | Not Found                |
| 500  | Internal Server Error    |

---

## Project Structure

```
blog-rest-api/
├── server.js           # App entry point, middleware setup
├── package.json
├── README.md
├── data/
│   └── posts.js        # In-memory data store & CRUD functions
├── middleware/
│   ├── logger.js       # Request logger
│   └── validate.js     # Input validation middleware
└── routes/
    └── posts.js        # All /api/posts route handlers
```

## Testing with curl

```bash
# Get all posts
curl http://localhost:3001/api/posts

# Get post by ID
curl http://localhost:3001/api/posts/1

# Create post
curl -X POST http://localhost:3001/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Hello World","content":"My first post!","author":"Ananya"}'

# Update post
curl -X PUT http://localhost:3001/api/posts/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Title"}'

# Delete post
curl -X DELETE http://localhost:3001/api/posts/1
```

## Submission
Minor Project 06 — Web Development Program  
Deadline: 20/06/2026

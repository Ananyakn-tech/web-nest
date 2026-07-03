// In-memory data store (acts as our "database")
let posts = [
  {
    id: 1,
    title: "Getting Started with Node.js",
    content: "Node.js is a runtime environment that allows you to run JavaScript on the server side. It is built on Chrome's V8 JavaScript engine and is perfect for building scalable network applications.",
    author: "Ananya",
    category: "Technology",
    createdAt: new Date("2026-06-01T10:00:00Z").toISOString(),
    updatedAt: new Date("2026-06-01T10:00:00Z").toISOString(),
  },
  {
    id: 2,
    title: "Understanding REST APIs",
    content: "REST (Representational State Transfer) is an architectural style for designing networked applications. RESTful APIs use HTTP requests to perform CRUD operations on resources.",
    author: "Ananya",
    category: "Web Development",
    createdAt: new Date("2026-06-05T12:00:00Z").toISOString(),
    updatedAt: new Date("2026-06-05T12:00:00Z").toISOString(),
  },
  {
    id: 3,
    title: "Express.js Middleware Explained",
    content: "Middleware functions are functions that have access to the request object, the response object, and the next middleware function. They are the backbone of any Express.js application.",
    author: "Ananya",
    category: "Backend",
    createdAt: new Date("2026-06-10T08:30:00Z").toISOString(),
    updatedAt: new Date("2026-06-10T08:30:00Z").toISOString(),
  },
];

let nextId = 4;

const getAll = () => posts;

const getById = (id) => posts.find((p) => p.id === id);

const create = ({ title, content, author, category }) => {
  const now = new Date().toISOString();
  const post = {
    id: nextId++,
    title: title.trim(),
    content: content.trim(),
    author: author ? author.trim() : "Anonymous",
    category: category ? category.trim() : "General",
    createdAt: now,
    updatedAt: now,
  };
  posts.unshift(post);
  return post;
};

const update = (id, fields) => {
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return null;
  posts[index] = {
    ...posts[index],
    ...fields,
    id: posts[index].id,
    createdAt: posts[index].createdAt,
    updatedAt: new Date().toISOString(),
  };
  return posts[index];
};

const remove = (id) => {
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return false;
  posts.splice(index, 1);
  return true;
};

module.exports = { getAll, getById, create, update, remove };

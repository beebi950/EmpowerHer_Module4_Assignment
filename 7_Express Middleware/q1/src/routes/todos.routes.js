import express from "express";
import fs from "fs";
import rateLimiter from "../middleware/rateLimiter.middleware.js";
import validateTodo from "../middleware/validateTodo.middleware.js";

const router = express.Router();
const dbPath = "./src/db.json";

// Utility functions
const readDB = () => {
  return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
};

const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};


// GET ALL TODOS (Rate-limited)
router.get("/", rateLimiter, (req, res) => {
  const db = readDB();
  res.json(db.todos);
});

// GET SINGLE TODO
router.get("/:todoId", (req, res) => {
  const { todoId } = req.params;
  const db = readDB();
  
  const todo = db.todos.find(t => t.id === Number(todoId));

  if (!todo) return res.status(404).json({ error: "Todo not found" });

  res.json(todo);
});

// ADD TODO (Validation middleware)
router.post("/add", validateTodo, (req, res) => {
  const db = readDB();
  
  const newTodo = {
    id: Date.now(),
    title: req.body.title
  };

  db.todos.push(newTodo);
  writeDB(db);

  res.status(201).json(newTodo);
});

// UPDATE TODO
router.put("/update/:todoId", (req, res) => {
  const { todoId } = req.params;
  const db = readDB();

  const todoIndex = db.todos.findIndex(t => t.id === Number(todoId));

  if (todoIndex === -1)
    return res.status(404).json({ error: "Todo not found" });

  db.todos[todoIndex] = { ...db.todos[todoIndex], ...req.body };
  writeDB(db);

  res.json(db.todos[todoIndex]);
});

// DELETE TODO
router.delete("/delete/:todoId", (req, res) => {
  const { todoId } = req.params;
  const db = readDB();

  const updatedTodos = db.todos.filter(t => t.id !== Number(todoId));
  
  if (updatedTodos.length === db.todos.length)
    return res.status(404).json({ error: "Todo not found" });

  db.todos = updatedTodos;
  writeDB(db);

  res.json({ message: "Todo deleted successfully" });
});

export default router;

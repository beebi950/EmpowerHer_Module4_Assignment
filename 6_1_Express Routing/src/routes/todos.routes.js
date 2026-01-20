
import express from "express";
import { readDB, writeDB } from "../utils/dbHandler.js";

const router = express.Router();

// Get all todos
router.get("/", (req, res) => {
  const db = readDB();
  res.json(db.todos);
});

// Get single todo
router.get("/:todoId", (req, res) => {
  const db = readDB();
  const todo = db.todos.find(t => t.id === parseInt(req.params.todoId));
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  res.json(todo);
});

// Add todo
router.post("/add", (req, res) => {
  const db = readDB();
  const newTodo = {
    id: db.todos.length ? db.todos[db.todos.length - 1].id + 1 : 1,
    ...req.body
  };
  db.todos.push(newTodo);
  writeDB(db);
  res.status(201).json(newTodo);
});

// Update todo
router.put("/update/:todoId", (req, res) => {
  const db = readDB();
  const index = db.todos.findIndex(t => t.id === parseInt(req.params.todoId));
  if (index === -1) return res.status(404).json({ message: "Todo not found" });

  db.todos[index] = { ...db.todos[index], ...req.body };
  writeDB(db);
  res.json(db.todos[index]);
});

// Delete todo
router.delete("/delete/:todoId", (req, res) => {
  const db = readDB();
  const index = db.todos.findIndex(t => t.id === parseInt(req.params.todoId));
  if (index === -1) return res.status(404).json({ message: "Todo not found" });

  const deletedTodo = db.todos.splice(index, 1);
  writeDB(db);
  res.json({ message: "Todo deleted", deletedTodo });
});

export default router;

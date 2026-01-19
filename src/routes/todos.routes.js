import express from "express";
import { readDB, writeDB } from "../helpers/fileHandler.js";

const router = express.Router();

// ➤ Create Todo
router.post("/add", (req, res) => {
  const db = readDB();
  const newTodo = req.body;

  newTodo.id = Date.now(); // Unique todoId
  db.todos.push(newTodo);

  writeDB(db);
  res.status(201).json({ message: "Todo created", todo: newTodo });
});

// ➤ Get All Todos
router.get("/", (req, res) => {
  const db = readDB();
  res.json(db.todos);
});

// ➤ Get Single Todo
router.get("/:todoId", (req, res) => {
  const db = readDB();
  const todo = db.todos.find((t) => t.id == req.params.todoId);

  if (!todo) return res.status(404).json({ message: "Todo not found" });

  res.json(todo);
});

// ➤ Update Todo
router.put("/update/:todoId", (req, res) => {
  const db = readDB();
  const todoId = req.params.todoId;

  const todoIndex = db.todos.findIndex((t) => t.id == todoId);

  if (todoIndex === -1)
    return res.status(404).json({ message: "Todo not found" });

  db.todos[todoIndex] = { ...db.todos[todoIndex], ...req.body };

  writeDB(db);
  res.json({ message: "Todo updated", todo: db.todos[todoIndex] });
});

// ➤ Delete Todo
router.delete("/delete/:todoId", (req, res) => {
  const db = readDB();
  const todoId = req.params.todoId;

  const updatedTodos = db.todos.filter((t) => t.id != todoId);

  if (updatedTodos.length === db.todos.length)
    return res.status(404).json({ message: "Todo not found" });

  db.todos = updatedTodos;
  writeDB(db);

  res.json({ message: "Todo deleted" });
});

export default router;

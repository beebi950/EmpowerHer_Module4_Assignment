import { TodoModel } from "../models/todo.model.js";

export const getTodos = (req, res) => {
  try {
    const todos = TodoModel.getAll();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: "Error fetching todos" });
  }
};

export const createTodo = (req, res) => {
  try {
    const { title, completed } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newTodo = TodoModel.create({ title, completed: completed || false });

    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ message: "Error creating todo" });
  }
};

export const updateTodo = (req, res) => {
  try {
    const { id } = req.params;
    const updated = TodoModel.update(id, req.body);

    if (!updated) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating todo" });
  }
};

export const deleteTodo = (req, res) => {
  try {
    const { id } = req.params;
    const deleted = TodoModel.delete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting todo" });
  }
};

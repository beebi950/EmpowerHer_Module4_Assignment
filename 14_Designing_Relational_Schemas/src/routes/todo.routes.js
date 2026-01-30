import express from "express";
import {
  addTodo,
  getMyTodos,
  updateTodo,
  deleteTodo
} from "../controllers/todo.controller.js";

const router = express.Router();

router.post("/add-todo", addTodo);
router.get("/get-my-todo/:userId", getMyTodos);
router.put("/update-todo/:todoId", updateTodo);
router.delete("/delete-todo/:todoId", deleteTodo);

export default router;

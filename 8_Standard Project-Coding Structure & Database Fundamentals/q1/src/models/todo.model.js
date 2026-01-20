import { readDB, writeDB } from "../utils/fileHandler.js";
import pkg from "uuid";
const { v4: uuid } = pkg;

export class TodoModel {
  static getAll() {
    const db = readDB();
    return db.todos;
  }

  static create(todo) {
    const db = readDB();
    const newTodo = { id: uuid(), ...todo };
    db.todos.push(newTodo);
    writeDB(db);
    return newTodo;
  }

  static update(id, updatedData) {
    const db = readDB();
    const index = db.todos.findIndex(t => t.id === id);

    if (index === -1) return null;

    db.todos[index] = { ...db.todos[index], ...updatedData };
    writeDB(db);

    return db.todos[index];
  }

  static delete(id) {
    const db = readDB();
    const newTodos = db.todos.filter(t => t.id !== id);

    if (newTodos.length === db.todos.length) return false;

    db.todos = newTodos;
    writeDB(db);
    return true;
  }
}

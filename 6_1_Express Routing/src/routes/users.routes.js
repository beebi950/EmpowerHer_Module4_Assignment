import express from "express";
import { readDB, writeDB } from "../utils/dbHandler.js";

const router = express.Router();

// Get all users
router.get("/", (req, res) => {
  const db = readDB();
  res.json(db.users);
});

// Get single user
router.get("/:userId", (req, res) => {
  const db = readDB();
  const user = db.users.find(u => u.id === parseInt(req.params.userId));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// Add user
router.post("/add", (req, res) => {
  const db = readDB();
  const newUser = {
    id: db.users.length ? db.users[db.users.length - 1].id + 1 : 1,
    ...req.body
  };
  db.users.push(newUser);
  writeDB(db);
  res.status(201).json(newUser);
});

// Update user
router.put("/update/:userId", (req, res) => {
  const db = readDB();
  const index = db.users.findIndex(u => u.id === parseInt(req.params.userId));
  if (index === -1) return res.status(404).json({ message: "User not found" });

  db.users[index] = { ...db.users[index], ...req.body };
  writeDB(db);
  res.json(db.users[index]);
});

// Delete user
router.delete("/delete/:userId", (req, res) => {
  const db = readDB();
  const index = db.users.findIndex(u => u.id === parseInt(req.params.userId));
  if (index === -1) return res.status(404).json({ message: "User not found" });

  const deletedUser = db.users.splice(index, 1);
  writeDB(db);
  res.json({ message: "User deleted", deletedUser });
});

export default router;
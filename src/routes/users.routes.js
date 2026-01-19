import express from "express";
import { readDB, writeDB } from "../helpers/fileHandler.js";

const router = express.Router();

// ➤ Create User
router.post("/add", (req, res) => {
  const db = readDB();
  const newUser = req.body;

  newUser.id = Date.now(); // Unique userId
  db.users.push(newUser);

  writeDB(db);
  res.status(201).json({ message: "User created", user: newUser });
});

// ➤ Get All Users
router.get("/", (req, res) => {
  const db = readDB();
  res.json(db.users);
});

// ➤ Get Single User
router.get("/:userId", (req, res) => {
  const db = readDB();
  const user = db.users.find((u) => u.id == req.params.userId);

  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
});

// ➤ Update User
router.put("/update/:userId", (req, res) => {
  const db = readDB();
  const userId = req.params.userId;

  const userIndex = db.users.findIndex((u) => u.id == userId);

  if (userIndex === -1)
    return res.status(404).json({ message: "User not found" });

  db.users[userIndex] = { ...db.users[userIndex], ...req.body };

  writeDB(db);
  res.json({ message: "User updated", user: db.users[userIndex] });
});

// ➤ Delete User
router.delete("/delete/:userId", (req, res) => {
  const db = readDB();
  const userId = req.params.userId;

  const updatedUsers = db.users.filter((u) => u.id != userId);

  if (updatedUsers.length === db.users.length)
    return res.status(404).json({ message: "User not found" });

  db.users = updatedUsers;
  writeDB(db);

  res.json({ message: "User deleted" });
});

export default router;

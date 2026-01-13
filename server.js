import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());

const DB_FILE = "./db.json";

// Read DB File
const readDB = () => {
  const data = fs.readFileSync(DB_FILE, "utf-8");
  return JSON.parse(data);
};

// Write DB File
const writeDB = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
};

/* ---------------------------------------------
   GET ALL STUDENTS
--------------------------------------------- */
app.get("/students", (req, res) => {
  const db = readDB();
  res.json({
    success: true,
    students: db.students,
  });
});

/* ---------------------------------------------
   ADD NEW STUDENT
--------------------------------------------- */
app.post("/students", (req, res) => {
  const { name, course, year } = req.body;

  if (!name || !course || !year) {
    return res.status(400).json({
      success: false,
      message: "Name, course, and year are required",
    });
  }

  const db = readDB();

  const newStudent = {
    id: db.students.length ? db.students[db.students.length - 1].id + 1 : 1,
    name,
    course,
    year,
  };

  db.students.push(newStudent);
  writeDB(db);

  res.status(201).json({
    success: true,
    message: "Student added successfully",
    student: newStudent,
  });
});

/* ---------------------------------------------
   UPDATE STUDENT (PUT)
--------------------------------------------- */
app.put("/students", (req, res) => {
  const { id, name, course, year } = req.body;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Student ID is required",
    });
  }

  const db = readDB();
  const index = db.students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Student not found",
    });
  }

  // Update fields only if provided
  if (name) db.students[index].name = name;
  if (course) db.students[index].course = course;
  if (year) db.students[index].year = year;

  writeDB(db);

  res.json({
    success: true,
    message: "Student updated successfully",
    student: db.students[index],
  });
});

/* ---------------------------------------------
   DELETE STUDENT BY ID
--------------------------------------------- */
app.delete("/students/:id", (req, res) => {
  const studentId = Number(req.params.id);
  const db = readDB();

  const studentExists = db.students.some((s) => s.id === studentId);
  if (!studentExists) {
    return res.status(404).json({
      success: false,
      message: "Student not found",
    });
  }

  db.students = db.students.filter((s) => s.id !== studentId);
  writeDB(db);

  res.json({
    success: true,
    message: "Student deleted successfully",
  });
});

/* ---------------------------------------------
   SERVER START
--------------------------------------------- */
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

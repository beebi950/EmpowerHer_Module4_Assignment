import express from "express";
import fs from "fs";

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());

// Path to db.json
const dbPath = "./db.json";

// Read DB File
function readDB() {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
}

// Write DB File
function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

/*
-------------------------------------------------------
GET /students → Fetch all students
-------------------------------------------------------
*/
app.get("/students", (req, res) => {
  const db = readDB();
  res.json({
    success: true,
    students: db.students,
  });
});

/*
-------------------------------------------------------
POST /students → Add new student
-------------------------------------------------------
*/
app.post("/students", (req, res) => {
  const { name, course, year } = req.body;

  if (!name || !course || !year) {
    return res.status(400).json({
      success: false,
      message: "All fields (name, course, year) are required.",
    });
  }

  const db = readDB();

  const newStudent = {
    id: Date.now(),
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

/*
-------------------------------------------------------
 PUT /students → Update student using ID
-------------------------------------------------------
*/
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

  // Update only received fields
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

/*
-------------------------------------------------------
 DELETE /students/:id → Delete student by ID
-------------------------------------------------------
*/
app.delete("/students/:id", (req, res) => {
  const studentId = Number(req.params.id);

  const db = readDB();
  const index = db.students.findIndex((s) => s.id === studentId);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Student not found",
    });
  }

  const deletedStudent = db.students.splice(index, 1);
  writeDB(db);

  res.json({
    success: true,
    message: "Student deleted successfully",
    deleted: deletedStudent[0],
  });
});

/*
-------------------------------------------------------
Start Server
-------------------------------------------------------
*/
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

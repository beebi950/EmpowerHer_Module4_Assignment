import express from "express";
import todoRoutes from "./src/routes/todo.routes.js";

const app = express();
app.use(express.json());

// Routes
app.use("/todos", todoRoutes);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

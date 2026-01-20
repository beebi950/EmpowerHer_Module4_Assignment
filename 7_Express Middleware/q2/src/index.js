import express from "express";
import userRouter from "./routes/users.routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Multipart handled by multer, but use json for non-file routes
app.use(express.json());

app.use("/users", userRouter);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

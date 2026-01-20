import express from "express";
import todoRouter from "./routes/todos.routes.js";
import loggerMiddleware from "./middleware/logger.middleware.js";

const app = express();
app.use(express.json());

// App-level logging middleware
app.use(loggerMiddleware);

// Mount Todo Router
app.use("/todos", todoRouter);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

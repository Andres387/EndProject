import express from "express";
import {
  createTodoController,
  getAllTodosController,
} from "../controllers/toDo.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const toDo = express.Router();

toDo.use(verifyToken);

toDo.get("/", (req, res) => {
  res.status(200).json({ message: "ok" });
});
toDo.get("/getAllTodos", getAllTodosController);
toDo.post("/createTodo", createTodoController);

export default toDo;

import TodoService from "../services/toDo.service.js";

const todoService = new TodoService();

export const createTodoController = async (req, res) => {
  const createTodorResult = await todoService.createTodo(req);
  res.status(createTodorResult.statusCode).json(createTodorResult);
};

export const getAllTodosController = async (req, res) => {
  const getAllTodosResult = await todoService.getAllTodos(req);
  res.status(getAllTodosResult.statusCode).json(getAllTodosResult);
};

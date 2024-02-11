import fs from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, "../common/todoData.txt");

class TodoModel {
  async createTodo(todoData, userData) {
    const existingData = await fs.readFile(filePath, "utf-8");
    const existingTodos = existingData ? JSON.parse(existingData) : [];
    // const todoId = existingTodos.filter((todo) => todo.userId === userData.user_id).length;

    todoData.id = uuidv4();
    todoData.completed = false;
    todoData.userId = userData.user_id;

    existingTodos.push(todoData);
    await fs.writeFile(filePath, JSON.stringify(existingTodos));

    return todoData;
  }

  async findAllTodos(userId) {
    const existingData = await fs.readFile(filePath, "utf-8");
    const existingTodos = existingData ? JSON.parse(existingData) : [];

    const todos = existingTodos.filter((todo) => todo.userId === userId);

    if (todos.length) {
      return todos;
    } else {
      return { error: "User has not todos yet" };
    }
  }

  //Activity

  findTodo(userId, todoId) {}

  deleteTodo() {}

  updateTodo() {}
}

export default TodoModel;

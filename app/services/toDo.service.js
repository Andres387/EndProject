import TodoModel from "../models/toDo.model.js";

class TodoService {
  constructor() {
    this.todoModel = new TodoModel();
  }

  async createTodo(req) {
    const { title, description } = req.body;

    if (!(title && description)) {
      return {
        statusCode: 400,
        message: "Please provide all params",
      };
    }
    const response = await this.todoModel.createTodo(req.body, req.user);
    return { statusCode: 200, todo: response };
  }

  async getAllTodos(req) {
    const userId = req?.user?.user_id;
    if (userId) {
      const response = await this.todoModel.findAllTodos(req?.user?.user_id);
      return { statusCode: 200, todo: response };
    } else {
      return {
        statusCode: 400,
        message: "UserId was not provided",
      };
    }
  }

  //Activity

  getTodo() {}

  updateTodo() {}

  deleteTodo() {}
}

export default TodoService;

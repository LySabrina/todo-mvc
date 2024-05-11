import "./styles/style.scss";
import TodoView from "./views/TodoView.js";
import TodoController from "./controllers/TodoController.js";
import List from "./models/List.js";
import Todo from "./models/Todo.js";

const list = new List();
const todoView = new TodoView();
const todoController = new TodoController(list, todoView);

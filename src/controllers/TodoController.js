import TodoItem from "../models/TodoItem.js";

/**
 * Responsible for handling Todo Collection
 * Controller is responsible for notifiying model of any updates
 * And tells the view of any changes inside the model
 *
 */
class TodoController {
  /**
   *
   * @param {List} model - a list of Todos projects
   * @param {TodoView} view
   */
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.activeTodo = this.model.getDefault();
    this.view.renderForm();
    const todoList = this.model.getDefault().getTodoList();
    this.view.renderNav();
    this.view.renderProjectList(this.model.getTodos());
    this.view.renderTodoItems(todoList);
    this.view.renderHeader(this.model.getDefault().name);
    this.view.bindAddNewTodoItem(this.handleAddNewTodoItem);
    this.view.bindDeleteTodoItem(this.handleDeleteTodoItem);
    this.view.bindEditTodoItem(this.handleEditTodoItem, this.getTodoItemInfo);
    this.view.bindAddNewTodo(
      this.handleAddNewTodoProject,
      this.checkIfTodoExist
    );
    this.view.bindSwitchTodo(this.handleSwitchTodo);
    this.view.bindCompleteTodoItem(this.handleCompleteTodoItem);
  }

  handleDeleteTodoItem = (todoId) => {
    this.activeTodo.deleteTodoItem(todoId);
    console.log("active todoist new lsit", this.activeTodo.todoList);
    const updatedTodoItems = this.activeTodo.todoList;
    this.view.renderTodoItems(updatedTodoItems);
    this.view.bindDeleteTodoItem(this.handleDeleteTodoItem); //do it again because when we re-render our todo items, the items no longer have their event listener
  };

  handleAddNewTodoItem = ({ title, description, dueDate, priority }) => {
    const date = new Date(dueDate);
    const newTodoItem = new TodoItem(title, description, date, priority);
    console.log(newTodoItem);
    this.activeTodo.addTodoItem(newTodoItem);
    const updatedTodosItems = this.activeTodo.todoList;
    this.view.renderTodoItems(updatedTodosItems);
    this.view.bindDeleteTodoItem(this.handleDeleteTodoItem); //do it again because when we re-render our todo items, the items no longer have their event listener
  };

  handleEditTodoItem = ({ title, description, dueDate, priority }, todoId) => {
    const todoItem = this.activeTodo.getTodoWithId(todoId);
    const date = new Date(dueDate);
    todoItem.setTitle(title);
    todoItem.setDescription(description);
    todoItem.setDueDate(date);
    todoItem.setPriority(priority);
    console.log("upated ", todoItem);
    const updatedTodosItems = this.activeTodo.todoList;
    this.view.renderTodoItems(updatedTodosItems);
    this.view.bindDeleteTodoItem(this.handleDeleteTodoItem); //do it again because when we re-render our todo items, the items no longer have their event listener
    this.view.bindEditTodoItem(this.handleEditTodoItem, this.getTodoItemInfo);
  };

  handleSwitchTodo = (name) => {
    console.log(name);
    console.log("ccurent active", this.activeTodo);
    console.log(this.model.getTodo(name));
    this.activeTodo = this.model.getTodo(name);
    this.view.renderTodoItems(this.activeTodo.todoList);
    this.view.bindDeleteTodoItem(this.handleDeleteTodoItem); //do it again because when we re-render our todo items, the items no longer have their event listener
    this.view.bindEditTodoItem(this.handleEditTodoItem, this.getTodoItemInfo);
    this.view.bindCompleteTodoItem(this.handleCompleteTodoItem);

    this.view.updateHeaderTitle(name);
  };

  handleAddNewTodoProject = (name) => {
    this.model.addTodo(name);
    console.log("updated project list, ", this.model.todos);
    const updatedProjectList = this.model.todos;
    this.view.renderProjectList(updatedProjectList);
    this.view.bindSwitchTodo(this.handleSwitchTodo);
  };

  checkIfTodoExist = (name) => {
    return this.model.checkIfTodoExist(name);
  };
  getTodoItemInfo = (todoId) => {
    return this.activeTodo.getTodoWithId(todoId);
  };

  handleCompleteTodoItem = (todoItemId, value) => {
    this.activeTodo.getTodoWithId(todoItemId).setCompleted(value);
    const updatedTodosItems = this.activeTodo.todoList;
    this.view.renderTodoItems(updatedTodosItems);
    this.view.bindDeleteTodoItem(this.handleDeleteTodoItem); //do it again because when we re-render our todo items, the items no longer have their event listener
    this.view.bindEditTodoItem(this.handleEditTodoItem, this.getTodoItemInfo);
    this.view.bindCompleteTodoItem(this.handleCompleteTodoItem);

    console.log("complete click", updatedTodosItems);
  };
}
export default TodoController;

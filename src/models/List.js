import Priority from "./Priority.js";
import Todo from "./Todo.js";
import TodoItem from "./TodoItem.js";
/**
 * Contains a list of Todo projects.
 * Default project is "Inbox" and it can not be deleted
 */
class List {
  constructor() {
    const defaultTodo = new Todo("Inbox");
    const todoEx2 = new TodoItem(
      "Test",
      "Description",
      new Date("2024-01-01"),
      Priority.High
    );
    const todoEx = new TodoItem(
      "Title",
      "Description",
      new Date("2024-01-01"),
      Priority.Low
    );
    defaultTodo.addTodoItem(todoEx2);
    defaultTodo.addTodoItem(todoEx);
    this.todos = [];
    this.todos.push(defaultTodo);
  }

  getDefault() {
    return this.todos[0];
  }
  getTodos() {
    return this.todos;
  }

  addTodo(todoName) {
    const newTodo = new Todo(todoName);
    this.todos.push(newTodo);
  }

  checkIfTodoExist(name){
    const arr = this.todos.filter((item)=>{
      return item.name == name;
    })
    console.log('list arr', arr);
    if(arr.length == 0){
      return false;
    }
    return true;
  }

  getTodo(todoName){
    const arr = this.todos.filter((item)=>{
      return item.name == todoName;
    });
    return arr[0];
  }
}

export default List;

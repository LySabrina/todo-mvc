class Todo {
  constructor(name) {
    this.name = name;
    this.todoList = [];
  }

  setName(name) {
    this.nam = name;
  }
  addTodoItem(todoItem) {
    this.todoList.push(todoItem);
  }

  deleteTodoItem(todoId){
    const newArr = this.todoList.filter((item)=>{
      return item.id != todoId;
    })
    this.todoList = newArr;
  }
  // deleteTodoItem(todoItem) {
  //   const newArr = this.todoList.filter((item) => {
  //     return item != todoItem;
  //   });
  //   this.todoList = newArr;
  // }

  getTodoList() {
    return this.todoList;
  }

  getTodoWithId(id){
    const todo = this.todoList.filter((item)=>{
      return item.id == id;
    })
    return todo[0];
  }
}

export default Todo;

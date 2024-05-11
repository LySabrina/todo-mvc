class TodoItem {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = false;
    this.id = crypto.randomUUID();
  }

  getFormatedDate(){
    const year= this.dueDate.getFullYear();
    const month = this.dueDate.getMonth();
    const day = this.dueDate.getDate();
    const formatString = year + "/" + month + "/" + day;
    return formatString;
  }
  setTitle(title) {
    this.title = title;
  }
  setDescription(description) {
    this.description = description;
  }
  setDueDate(dueDate) {
    this.dueDate = dueDate;
  }
  setPriority(priority) {
    this.priority = priority;
  }

  setCompleted(status) {
    this.completed = status;
  }

  deleteSubItem(todoItem) {
    const newArr = this.checklist.filter((item) => {
      return item != todoItem;
    });
    this.checklist = newArr;
  }

  
}

export default TodoItem;

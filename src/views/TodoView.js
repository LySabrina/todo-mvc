import { createElement } from "./helper.js";

import pencilLight from "../assets/images/svg/icon-pencil-light.svg";
import pencilDark from "../assets/images/svg/icon-pencil-dark.svg";
import redFlag from "../assets/images/svg/icon-flag-red.svg";
import yellowFlag from "../assets/images/svg/icon-flag-yellow.svg";
import greenFlag from "../assets/images/svg/icon-flag-green.svg";
import hamburgerIcon from "../assets/images/svg/icon-hamburger.svg";
import closeIcon from "../assets/images/svg/icon-cross.svg";
import sunIcon from "../assets/images/svg/icon-moon.svg";
import moonIcon from "../assets/images/svg/icon-sun.svg";
import Priority from "../models/Priority.js";

class TodoView {
  constructor() {
    this.root = document.querySelector("#root");
    this.header = createElement("header");
    this.root.insertAdjacentElement("afterbegin", this.header);
    this.nav = createElement("nav", "nav");

    this.modal = createElement("dialog", "modal");
    this.editModal = createElement("dialog", "edit-modal");
    this.root.append(this.modal, this.editModal);

    this.header.insertAdjacentElement("afterend", this.nav);

    this.container = createElement("div", "container");
    this.list = createElement("ul", "todo-list");
    this.container.append(this.list);
    this.root.append(this.container);
  }

  renderTodoItems(todosItems) {
    this.list.innerHTML = "";
    for (let todoItem of todosItems) {
      const li = this.createTodoItem(todoItem);
      this.list.append(li);
    }
  }

  renderForm() {
    const form = createElement("form", "form");
    const titleInput = createElement("input");
    titleInput.type = "text";
    titleInput.name = "title";
    titleInput.placeholder = "Enter Title";
    const descriptionInput = createElement("input");
    descriptionInput.name = "description";
    descriptionInput.type = "text";
    descriptionInput.placeholder = "Enter description";
    const dateInput = createElement("input");
    dateInput.name = "dueDate";
    dateInput.type = "date";
    const priorityDropDown = createElement("select");
    priorityDropDown.name = "priority";
    ////
    for (let key of Object.keys(Priority)) {
      const option = createElement("option");
      option.value = key;
      const span = createElement("span");
      span.textContent = key;
      const img = createElement("img");
      img.src = hamburgerIcon;
      img.style.width = "1rem";
      img.style.height = "1rem";
      span.append(img);
      option.append(span);
      priorityDropDown.append(option);
    }

    const div = createElement('div', 'form__btns');
    const submitBtn = createElement("button", "form__submit");
    submitBtn.textContent = "Submit";
    const cancelBtn = createElement("button");
    cancelBtn.type = "button";
    cancelBtn.textContent = "Cancel";
    cancelBtn.onclick = () => {
      this.modal.close();
    };
    div.append(cancelBtn,submitBtn);
    const btnForm = createElement("button", "form__open");
    btnForm.textContent = "Add new Task";
    btnForm.onclick = () => {
      this.modal.showModal();
    };
    this.container.insertAdjacentElement("afterbegin", btnForm);
    form.append(
      titleInput,
      descriptionInput,
      dateInput,
      priorityDropDown,
      div
    );
    this.modal.append(form);
  }

  renderEditForm(todoItem) {
    console.log("the tiem", todoItem);
    this.editModal.innerHTML = "";
    const form = createElement("form", "form-edit");
    const titleInput = createElement("input");
    titleInput.type = "text";
    titleInput.name = "title";
    titleInput.placeholder = todoItem.title;
    const descriptionInput = createElement("input");
    descriptionInput.name = "description";
    descriptionInput.type = "text";
    descriptionInput.placeholder = todoItem.description;
    const dateInput = createElement("input");
    dateInput.name = "dueDate";
    dateInput.type = "date";
    dateInput.value = todoItem.getFormatedDate;
    const priorityDropDown = createElement("select");
    priorityDropDown.name = "priority";
    ////
    for (let key of Object.keys(Priority)) {
      const option = createElement("option");
      option.value = key;
      const span = createElement("span");
      span.textContent = key;
      const img = createElement("img");
      img.src = hamburgerIcon;
      img.style.width = "1rem";
      img.style.height = "1rem";
      span.append(img);
      option.append(span);
      priorityDropDown.append(option);
    }
    priorityDropDown.value = todoItem.priority;
    const submitBtn = createElement("button", "form__submit");
    submitBtn.textContent = "Update Todo Item";
    const cancelBtn = createElement("button");
    cancelBtn.type = "button";
    cancelBtn.textContent = "Cancel";
    cancelBtn.onclick = () => {
      this.editModal.close();
    };

    const div = createElement('div', 'form__btns');
    div.append(cancelBtn, submitBtn);
    form.append(
      titleInput,
      descriptionInput,
      dateInput,
      priorityDropDown,
      div
    );
    this.editModal.append(form);
    this.editModal.showModal();
  }

  renderHeader(headerName) {
    this.header.innerHTML = "";
    const title = createElement("h1");
    title.textContent = headerName;
    this.header.append(title);

    const hamburger = createElement("button", "hamburger");
    const img3Bar = createElement("img");
    img3Bar.src = hamburgerIcon;

    hamburger.append(img3Bar);

    hamburger.onclick = () => {
      this.nav.classList.toggle("hide");
    };
    this.header.append(hamburger);
  }

  updateHeaderTitle(name) {
    const title = this.header.querySelector("h1");
    title.textContent = name;
  }

  renderNav() {
    const navSettings = createElement("div", "nav__settings");
    const themeBtn = createElement("button", "nav__themes");
    const sun = createElement("img");
    sun.src = sunIcon;
    const moon = createElement("img");
    moon.src = moonIcon;
    themeBtn.append(sun, moon);

    const input = createElement("input", "nav__input");
    input.type = "text";
    input.placeholder = "Enter Todo Project Name";

    navSettings.append(themeBtn);
    this.nav.append(navSettings);
    this.nav.append(input);

    const projectList = createElement("ul", "nav__list");
    this.nav.append(projectList);
    this.handleThemeSwitch();
  }

  renderProjectList(todoList) {
    console.log("lisssst ", todoList);
    const navList = document.querySelector(".nav__list");
    navList.innerHTML = "";
    for (let todo of todoList) {
      const li = createElement("li");

      const button = createElement("button", "nav__list-btn");

      button.textContent = todo.name;
      li.append(button);
      navList.append(li);
    }
  }

  createTodoItem(todoItem) {
    const li = createElement("li", "todo-item");
    li.dataset.id = todoItem.id;

    const checkbox = createElement("input", "todo-item__checkbox");
    checkbox.type = "checkbox";
    checkbox.checked = todoItem.completed;

    const info = createElement("div", "todo-item__info");
    const infoTitle = createElement("h1", "todo-item__title");
    infoTitle.textContent = todoItem.title;
    const subInfo = createElement("div", "todo-item__sub-info");
    const dueDate = createElement("span", "todo-item__dueDate");
    dueDate.textContent = todoItem.getFormatedDate();

    const priority = createElement("span", "todo-item__priority");
    priority.dataset.priority = todoItem.priority;
    const flagImg = createElement("img");

    switch (todoItem.priority) {
      case "Low":
        flagImg.src = greenFlag;
        break;
      case "Medium":
        flagImg.src = yellowFlag;
        break;
      default:
        flagImg.src = redFlag;
    }

    priority.append(flagImg);
    subInfo.append(dueDate, priority);
    info.append(infoTitle, subInfo);

    const btns = createElement("div", "todo-item__btns");

    const editBtn = createElement("button", "todo-item__edit-btn");
    const editImg = createElement("img");
    if (this.root.className == "dark-theme") {
      editImg.src = pencilDark;
    } else {
      editImg.src = pencilLight;
    }

    editBtn.append(editImg);

    const deleteBtn = createElement("button", "todo-item__delete-btn");

    const deleteImg = createElement("img");
    deleteImg.src = closeIcon;

    deleteBtn.append(deleteImg);
    btns.append(editBtn, deleteBtn);

    li.append(checkbox, info, btns);
    return li;
  }

  bindAddNewTodoItem(handler) {
    const form = document.querySelector(".form");
    const todoItem = {};
    form.onsubmit = (e) => {
      e.preventDefault();
      const elems = form.elements;
      for (let elem of elems) {
        if (elem.tagName == "INPUT" || elem.tagName == "SELECT") {
          if (elem.value == "") {
            alert("EMPTY STRING");
            return;
          }

          todoItem[elem.name] = elem.value;
        }
      }
      handler(todoItem);
      for (let elem of elems) {
        elem.value = "";
      }

      this.modal.close();
    };
  }

  bindDeleteTodoItem(handler) {
    const deleteBtns = document.querySelectorAll(".todo-item__delete-btn");
    console.log(deleteBtns);
    for (let deleteBtn of deleteBtns) {
      deleteBtn.onclick = () => {
        const li = deleteBtn.closest("li.todo-item");
        const todoId = li.dataset.id;
        console.log(todoId);
        handler(todoId);
      };
    }
  }

  bindEditTodoItem(handler, findTodo) {
    const editBtns = document.querySelectorAll(".todo-item__edit-btn");
    const updatedTodo = {};
    for (let editBtn of editBtns) {
      editBtn.onclick = () => {
        const li = editBtn.closest("li.todo-item");
        const todoId = li.dataset.id;
        const todo = findTodo(todoId);
        this.renderEditForm(todo);
        const form = document.querySelector(".form-edit");

        form.onsubmit = (e) => {
          e.stopPropagation();
          e.preventDefault();
          const elems = form.elements;
          for (let elem of elems) {
            if (elem.tagName == "INPUT" || elem.tagName == "SELECT") {
              if (elem.value == "") {
                alert("EMPTY STRING");
                return;
              }
              updatedTodo[elem.name] = elem.value;
            }
          }
          this.editModal.close();
          handler(updatedTodo, todoId);
          console.log("updated todo ", updatedTodo);
        };
      };
    }
  }

  bindAddNewTodo(handler, checkIfExist) {
    const input = document.querySelector(".nav__input");
    input.onkeydown = (e) => {
      if (e.key == "Enter") {
        const value = input.value;
        if (value == "") {
          alert("EMPTY TODO PROJECT NAME");
          return;
        }
        if (!checkIfExist(value)) {
          handler(value);
        } else {
          alert("EXISTING TODO NAME");
          return;
        }
      }
    };
  }

  bindSwitchTodo(handler) {
    const projects = document.querySelectorAll(".nav__list-btn");
    for (let project of projects) {
      project.onclick = (e) => {
        const name = e.target.textContent;
        handler(name);
      };
    }
  }

  bindCompleteTodoItem(handler) {
    const checkboxs = document.querySelectorAll(".todo-item__checkbox");
    for (let checkbox of checkboxs) {
      checkbox.onclick = (e) => {
        const target = e.target;
        const clickVal = target.checked;
        const todoId = checkbox.closest("li").dataset.id;

        handler(todoId, clickVal);
      };
    }
  }

  handleThemeSwitch() {
    const themeBtn = document.querySelector(".nav__themes");
    themeBtn.onclick = () => {
      if (this.root.className == "dark-theme") {
        this.root.classList.remove("dark-theme");
        this.root.classList.add("light-theme");
      } else {
        this.root.classList.remove("light-theme");
        this.root.classList.add("dark-theme");
      }
    };
  }
}

export default TodoView;

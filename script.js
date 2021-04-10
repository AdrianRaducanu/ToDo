//select

const todoInput = document.querySelector(".form-txt");
const todoBtn = document.querySelector(".form-submit");
const todoList = document.querySelector(".list");
const filterOption = document.querySelector(".filtru");

//event
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);
//functions
//functia pt adaugare de elemente
function addTodo(event) {
  //anuleaza refreshul provenit din submit
  event.preventDefault();

  //creez todo div ce contine element si buton de stergere
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo-div");

  //creez element pt div
  const todoNew = document.createElement("li");
  todoNew.innerText = todoInput.value;
  todoNew.classList.add("todo-item");
  todoDiv.appendChild(todoNew);

  //adaugare in local storage
  saveLocalTodos(todoInput.value);


  //creez buton de completed
  const completBtn = document.createElement("button");
  completBtn.innerHTML = `<i class="fas fa-check"></i>`;
  completBtn.classList.add("complete-btn");
  todoDiv.appendChild(completBtn);

  //creez buton de delete
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = `<i class="fas fa-trash"></i>`;
  deleteBtn.classList.add("delete-btn");
  todoDiv.appendChild(deleteBtn);

  //atasare la lista principlata
  todoList.appendChild(todoDiv);

  //sterg textul din input
  todoInput.value = "";
}

//functia pt stergere/check pt fiecare element
function deleteCheck(event) {
  const item = event.target;

  //verificam daca cea mai de sus clasa(adica sa nu dam click in body say html) e clasa delete sau check
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    //animatia
    todo.classList.add("deleted");
    //stergem la finalul tranzitiei
    todo.addEventListener("transitionend", function () {
      todo.remove();
      removeTodos(todo);
    });
  }
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    //toggle pt a avea varianta de click again pt revenire
    todo.classList.toggle("completed");
  }
}

//functia pt filtrarea elem
function filterTodo(event) {
  const todos = todoList.children;
  for (let i = 0; i < todos.length; i++) {
    switch (event.target.value) {
      case "all":
        todos[i].style.display = "flex";
        break;
      case "completed":
        if (todos[i].classList.contains("completed")) {
          todos[i].style.display = "flex";
        } else {
          todos[i].style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todos[i].classList.contains("completed")) {
          todos[i].style.display = "flex";
        } else {
          todos[i].style.display = "none";
        }
        break;
    }
  }
}

// local storage
function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-div");

    //creez element pt div
    const todoNew = document.createElement("li");
    todoNew.innerText = todo;
    todoNew.classList.add("todo-item");
    todoDiv.appendChild(todoNew);

    //creez buton de completed
    const completBtn = document.createElement("button");
    completBtn.innerHTML = `<i class="fas fa-check"></i>`;
    completBtn.classList.add("complete-btn");
    todoDiv.appendChild(completBtn);

    //creez buton de delete
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<i class="fas fa-trash"></i>`;
    deleteBtn.classList.add("delete-btn");
    todoDiv.appendChild(deleteBtn);

    //atasare la lista principlata
    todoList.appendChild(todoDiv);
  });
}

function removeTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  console.log(todos);
  const todoIndex = todo.innerText;
  console.log(todos.indexOf(todoIndex));

  //if e folosit deoarece am o eroare ciudata -> (todos.indexOf(todoIndex)) afisa atat indexul bun cat si -1 si acest lucru imi stergea automat ultimul element
  if (todos.indexOf(todoIndex) >= 0) {
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

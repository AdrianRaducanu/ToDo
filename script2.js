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


  let ok = 0;
  for (let i=1; i<=todoList.childElementCount; i++){
      if(todoList.childNodes[i].innerText === todoInput.value){
          ok = 1;
      }
  }
  if(ok){
      alert("This already exists! Add something else!");
  } else{
  
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
      isCheckedDelete(todo.innerText)
    });
  }
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    //toggle pt a avea varianta de click again pt revenire
    todo.classList.toggle("completed");
    if(todo.classList.contains("completed")){
        //localStorage.setItem("checked", "x")
        console.log(todo.innerText);
        isChecked(todo.innerText);
    }else {
        isCheckedDelete(todo.innerText);
    }
  }
}
//adauga atributul check in storage
function isChecked(todo){
    let checked;
    if (localStorage.getItem("checked") === null) {
        checked = [];
      } else {
        checked = JSON.parse(localStorage.getItem("checked"));
      }
      checked.push(todo);
      localStorage.setItem("checked", JSON.stringify(checked));

}

//sterge atributul check din storage
function isCheckedDelete(todo){
  let checked;
  if (localStorage.getItem("checked") === null) {
    checked = [];
  } else {
    checked = JSON.parse(localStorage.getItem("checked"));
  }
  

  //if e folosit deoarece am o eroare ciudata -> (todos.indexOf(todoIndex)) afisa atat indexul bun cat si -1 si acest lucru imi stergea automat ultimul element
  if (checked.indexOf(todo) >= 0) {
    checked.splice(checked.indexOf(todo), 1);
    localStorage.setItem("checked", JSON.stringify(checked));
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

  let checked;
  if (localStorage.getItem("checked") === null) {
    checked = [];
  } else {
    checked = JSON.parse(localStorage.getItem("checked"));
  }

  console.log(checked);
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-div");
    let ok = 0;
    for(let i = 0; i < checked.length; i ++){
        if(checked[i] === todo){
            ok = 1;
        }
    }
    if (ok){
        todoDiv.classList.add("completed");
    }
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

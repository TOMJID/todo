const inputField = document.querySelector("#task__input");
const addTodo = document.querySelector("#add__task");
const todoList = document.querySelector("#task__list");

document.addEventListener("DOMContentLoaded", () => {
  // Load tasks from localStorage when the page loads
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    updateTodoList();
  }
});

let tasks = [];
// saving the tasks to localStorage
const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// getting the input text & adding it to the tasks array
const addTask = () => {
  const todoInput = inputField.value.trim();
  if (todoInput) {
    tasks.push({ text: todoInput, completed: false });
    inputField.value = "";
    updateTodoList();
    saveTasks();
  }
};

// after getting the input text rendering it to the todo list
const updateTodoList = () => {
  todoList.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItems = document.createElement("li");
    listItems.innerHTML = `
      <div class="li ${task.completed ? "completed" : ""}">
      ${task.text}
      <div class="icons--container">
        <button class="icons--hover hover:bg-red-400 group" onclick="deleteTask(${index})">
        <!-- Delete Icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="icons text-red-500 group-hover:text-indigo-500">
          <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12" />
          
        </svg>
        </button>
        <button class="icons--hover hover:bg-yellow-400 group" onclick="editTask(${index})">
        <!-- Edit Icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="icons text-yellow-500 group-hover:text-indigo-500">
          <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16.862 3.487a2.25 2.25 0 1 1 3.182 3.182L7.5 19.213l-4.182.545.545-4.182 12.999-12.089z" />
          
        </svg>
        </button>
        <button class="icons--hover hover:bg-green-400 group" onclick="completeTask(${index})">
        <!-- Complete Icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="icons text-green-500 group-hover:text-indigo-500">
          <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4.5 12.75l6 6 9-13.5" />
          
        </svg>
        </button>
      </div>
      </div>
    `;
    todoList.appendChild(listItems);
  });
};

// preventing the default action of the form submission
addTodo.addEventListener("click", function (e) {
  e.preventDefault();

  addTask();
});

// completeTask, deleteTask, and editTask functions
// These functions are called from the HTML onclick attributes
completeTask = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTodoList();
  saveTasks();
};
deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTodoList();
  saveTasks();
};
editTask = (index) => {
  inputField.value = tasks[index].text;
  tasks.splice(index, 1);
  updateTodoList();
  saveTasks();
};


const inputField = document.querySelector("#task__input");
const addTodo = document.querySelector("#add__task");
const todoList = document.querySelector("#task__list");

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
      <div class="li">
      ${task.text}
      <div class="icons--container">
        <button class="icons--hover" onclick="deleteTask(${index})">
        <!-- Delete Icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="icons hover:text-red-900">
          <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12" />
          
        </svg>
        </button>
        <button class="icons--hover" onclick="editTask(${index})">
        <!-- Edit Icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="icons hover:text-yellow-900">
          <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16.862 3.487a2.25 2.25 0 1 1 3.182 3.182L7.5 19.213l-4.182.545.545-4.182 12.999-12.089z" />
          
        </svg>
        </button>
        <button class="icons--hover" onclick="completeTask(${index})">
        <!-- Complete Icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="icons hover:text-green-900">
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
  if (tasks[index].completed) {
    const listItems = todoList.querySelectorAll("li")[index];
    listItems.style.textDecoration = "line-through";
    listItems.style.color = "gray";
  }
};
deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTodoList();
};
editTask = (index) => {
  inputField.value = tasks[index].text;
  tasks.splice(index, 1);
  updateTodoList();
};


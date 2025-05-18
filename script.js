"use strict";

// Ввод задачи
// Кнопка "Добавить"
// Отображение списка задач
// Возможность отметить как "выполнено"
// Возможность удалить задачу
// Добавить фильтр: Все | Выполненные | Активные

const input = document.querySelector(".input"),
  btn = document.querySelector(".add__task"),
  form = document.querySelector(".action"),
  tasks = document.querySelector(".tasks"),
  closes = document.querySelectorAll(".task__close"),
  filter = document.querySelector(".filter");

// ----------------- Main arr -----------------
let tasksArr = [
  { content: "Clean House", done: true },
  { content: "Learn English", done: false },
  { content: "Create project", done: true },
];

// ----------------- Render -----------------
function renderTasks(taskList) {
  tasks.innerHTML = "";
  taskList.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.innerHTML = `
    <label >
      <input type="checkbox" name="checkbox" class="task__checkbox" data-index="${index}" ${
      task.done ? "checked" : ""
    }/>
      <span class="task__name ${task.done ? "checked" : ""}">
        ${index + 1}. ${task.content}
      </span>
    </label>
    <button class="task__close" data-index="${index}">×</button>
    `;
    tasks.appendChild(taskDiv);
  });
}

// ----------------- Add Task -----------------
function addTask() {
  if (input.value) {
    tasksArr.push({ content: input.value, done: false });
    renderTasks(tasksArr);
  }
  input.value = "";
}
form.addEventListener("submit", addTask);

// ----------------- Checked function -----------------
tasks.addEventListener("change", (event) => {
  if (event.target.classList.contains("task__checkbox")) {
    const label = event.target.closest("label");
    const span = label.querySelector("span");
    if (event.target.checked) {
      span.classList.add("checked");
      tasksArr[event.target.dataset.index].done = true;
    } else {
      span.classList.remove("checked");
      tasksArr[event.target.dataset.index].done = false;
    }
  }
});

// ----------------- Close function -----------------
tasks.addEventListener("click", (event) => {
  if (event.target.classList.contains("task__close")) {
    const index = event.target.dataset.index;
    tasksArr.splice(index, 1);
    renderTasks(tasksArr);
  }
});

// ----------------- Filter -----------------
filter.addEventListener("change", (event) => {
  let currentFilter = event.target.value;

  function getFilteredTasks() {
    switch (currentFilter) {
      case "done":
        return tasksArr.filter((t) => t.done);
      case "active":
        return tasksArr.filter((t) => !t.done);
      case "all":
        return tasksArr;
    }
  }

  // А потом просто:
  renderTasks(getFilteredTasks());
});

renderTasks(tasksArr);

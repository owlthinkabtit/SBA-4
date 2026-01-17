
let taskForm = document.getElementById("task-form");
let taskName = document.getElementById("task-name");
let taskCategory = document.getElementById("task-category");
let deadline = document.getElementById("task-deadline");
let taskStatus = document.getElementById("task-status");
let taskList = document.getElementById("tasks");
let filterStatus = document.getElementById("filter-status");

let tasks = [];

let savedTasks = localStorage.getItem("tasks");
if (savedTasks) {
  tasks = JSON.parse(savedTasks);
};


taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let newTask = {
    name: taskName.value,
    category: taskCategory.value,
    deadline: deadline.value,
    taskStatus: taskStatus.value
  };
  tasks.push(newTask);
  saveTasks();
  renderTasks(tasks);

  taskForm.reset();

});

filterStatus.addEventListener("change", function () {
  let selectedStatus = filterStatus.value;

  if (selectedStatus === "all") {
    renderTasks(tasks);
  } else {
    let filteredTasks = tasks.filter(task => task.taskStatus === selectedStatus);
    renderTasks(filteredTasks);
  };
});

function renderTasks(taskArray) {
  taskList.innerHTML = "";

  let today = new Date();

  for (let i = 0; i < taskArray.length; i++) {
    let task = taskArray[i];
    let taskDeadline = new Date(task.deadline);
    if (
      tasks.taskStatus !== "completed" &&
      taskDeadline < today
    ) {
      task.taskStatus = "overdue";
    }
    let li = document.createElement("li");

    let statusSelect = document.createElement("select");

    ["pending", "in-progress", "completed"].forEach(status => {
      let option = document.createElement("option");
      option.value = status;
      option.textContent = status;
      if (task.taskStatus === status) option.selected = true;
      statusSelect.appendChild(option);
    });

    statusSelect.addEventListener("change", function () {
      task.taskStatus = statusSelect.value;
      saveTasks();
      renderTasks(tasks);
    });

    li.textContent = `${task.name} | ${task.category} | ${task.deadline} | `;
    li.appendChild(statusSelect);
    taskList.appendChild(li);

  };
};

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}



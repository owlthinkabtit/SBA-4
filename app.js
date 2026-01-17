let tasks = [];

let taskForm = document.getElementById("task-form");
let taskName = document.getElementById("task-name");
let taskCategory = document.getElementById("task-category");
let deadline = document.getElementById("task-deadline");
let taskStatus = document.getElementById("task-status");


taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let newTask = {
    name: taskName.value,
    category: taskCategory.value,
    deadline: deadline.value,
    taskStatus: taskStatus.value
  };
  tasks.push(newTask);

  console.log("Current tasks:", tasks);
  taskForm.reset();

});


// Function to add a new task
function addTask() {
  var taskInput = document.getElementById("taskInput");
  var taskList = document.getElementById("taskList");

  if (taskInput.value.trim() !== "") {
    var taskText = taskInput.value;
    var taskItem = document.createElement("li");
    taskItem.innerText = taskText;

    // Add event listener to mark task as completed when clicked
    taskItem.addEventListener("click", function () {
      this.classList.toggle("task-completed");
      updateLocalStorage();
    });

    // Add event listener to remove task when double clicked
    taskItem.addEventListener("dblclick", function () {
      this.remove();
      updateLocalStorage();
    });

    taskList.appendChild(taskItem);
    taskInput.value = "";

    // Update localStorage
    updateLocalStorage();
  } else {
    alert("Tolong masukkan teks tugas!");
  }
}

// Function to update localStorage
function updateLocalStorage() {
  var taskList = document.getElementById("taskList");
  var tasks = taskList.querySelectorAll("li");

  var taskArray = [];
  tasks.forEach(function (task) {
    taskArray.push({
      text: task.innerText,
      completed: task.classList.contains("task-completed"),
    });
  });

  localStorage.setItem("tasks", JSON.stringify(taskArray));
}

// Function to load tasks from localStorage
function loadTasks() {
  var taskList = document.getElementById("taskList");
  var tasks = JSON.parse(localStorage.getItem("tasks"));

  if (tasks) {
    tasks.forEach(function (task) {
      var taskItem = document.createElement("li");
      taskItem.innerText = task.text;
      if (task.completed) {
        taskItem.classList.add("task-completed");
      }
      taskItem.addEventListener("click", function () {
        this.classList.toggle("task-completed");
        updateLocalStorage();
      });
      taskItem.addEventListener("dblclick", function () {
        this.remove();
        updateLocalStorage();
      });
      taskList.appendChild(taskItem);
    });
  }
}

// Load tasks when the page is loaded
window.addEventListener("load", function () {
  loadTasks();
});

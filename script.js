let tasks = [];

document.addEventListener("DOMContentLoaded", () => {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  renderTasks();
});

function addTask() {
  try {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText === "") return;

    const prioritySelect = document.getElementById("prioritySelect");
    const priorityValue = prioritySelect.value.toLowerCase();

    const task = {
      text: taskText,
      priority: priorityValue,
      completed: false,
    };

    tasks.push(task);
    saveTasksToLocalStorage();
    renderTasks();
    taskInput.value = "";
  } catch (error) {
    console.error("Error adding task:", error);
  }
}

function deleteTask(index) {
  try {
    tasks.splice(index, 1);
    saveTasksToLocalStorage();
    renderTasks();
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

function toggleTaskStatus(index) {
  try {
    tasks[index].completed = !tasks[index].completed;
    saveTasksToLocalStorage();
    renderTasks();
  } catch (error) {
    console.error("Error toggling task status:", error);
  }
}

function editTask(index) {
  try {
    const newText = prompt("Edit the task:", tasks[index].text);
    
    if (newText !== null) { // If the user didn't click Cancel
      tasks[index].text = newText.trim();
      saveTasksToLocalStorage();
      renderTasks();
    }
  } catch (error) {
    console.error("Error editing task:", error);
  }
}

function renderTasks() {
  try {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.sort((a, b) => {
      const priorityOrder = { high: 1, medium: 2, low: 3, 'no-priority': 4 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    tasks.forEach((task, index) => {
      const listItem = document.createElement("li");

      if (task.priority && task.priority.trim() !== "") {
        listItem.classList.add(task.priority.trim());
      }

      if (task.completed) {
        listItem.classList.add("completed");
      }

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => toggleTaskStatus(index));

      const taskText = document.createElement("span");
      taskText.innerText = task.text;

      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";
      deleteButton.addEventListener("click", () => deleteTask(index));

      const editButton = document.createElement("button");
      editButton.innerText = "Edit";
      editButton.addEventListener("click", () => editTask(index));

      listItem.appendChild(checkbox);
      listItem.appendChild(taskText);
      listItem.appendChild(deleteButton);
      listItem.appendChild(editButton);

      taskList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error rendering tasks:", error);
  }
}

function saveTasksToLocalStorage() {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks to local storage:", error);
  }
}
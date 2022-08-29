const taskTitle = document.querySelector("#task-title");
const taskContent = document.querySelector("#task-content");
const saveTaskButton = document.querySelector("#save-task");
const taskListBox = document.querySelector("#task-list-box");
const toastBar = document.querySelector("#toast-bar");
const body = document.querySelector("body");

let task = {
  id: 0,
  title: ``,
  content: ``,
  setTime: new Date(),
  background: "#000fff",
  isDone: false,
};

let taskList = getLocalTaskList("taskList") || [];
if (taskList.length > 0) {
  for (let i = 0; i < taskList.length; i++) {
    addTaskToDisplay(taskList[i]);
  }
}
taskTitle.addEventListener(
  "change",
  (e) => {
    task = saveTask(task, "title", e);
  },
  false
);

taskContent.addEventListener(
  "change",
  (e) => {
    task = saveTask(task, "content", e);
  },
  false
);

saveTaskButton.addEventListener(
  "click",
  () => {
    taskList = addTaskToList(task, taskList);
    console.log({ taskList }, "in saving task");
    let taskToBeAdded = taskList[taskList.length - 1];
    // let taskToBeAdded = task;
    addTaskToDisplay(taskToBeAdded);
    showToast(`${taskToBeAdded.title || "Untitled"} saved successfully `);
    resetValues(task);
  },
  false
);

function addTaskToDisplay(taskObject) {
  let taskItem = document.createElement("li");
  let deleteTaskButton = document.createElement("button");
  let editTaskButton = document.createElement("button");
  let deleteIcon = document.createElement("em");
  let editIcon = document.createElement("em");

  taskItem.setAttribute("id", taskObject.id);
  taskItem.className = "task-card";
  deleteTaskButton.setAttribute("class", "delete-task button icon-button");
  editTaskButton.setAttribute("class", "delete-task button icon-button");
  deleteIcon.className = "fa-solid fa-trash";
  editIcon.className = "fa-solid fa-edit";

  taskItem.innerHTML = `<h3 class="task__header--display" id="display-header">${taskObject.title}</h3><p class="task__content--display" id="display--content"> ${taskObject.content} </p>`;
  deleteTaskButton.addEventListener("click", (e) => {
    console.log(e.target.parentElement.parentElement.id);
    let deleteItem = document.getElementById(
      e.target.parentElement.parentElement.id
    );
    deleteTaskFromList(e.target.parentElement.parentElement.id);
    let deletedItem = taskListBox.removeChild(deleteItem);
    console.log(deletedItem);
  });

  deleteTaskButton.appendChild(deleteIcon);
  editTaskButton.appendChild(editIcon);
  taskItem.appendChild(deleteTaskButton);
  taskItem.appendChild(editTaskButton);
  taskListBox.appendChild(taskItem);
}

function addTaskToList(taskObj, taskArray) {
  console.log(taskObj, taskArray, "from addtasktolist");
  // if (taskObj.content.length <= 0) return taskArray;
  taskArray = [
    ...taskArray,
    {
      ...taskObj,
      id: Date.now(),
      title: taskObj.title || "Untitled",
    },
  ];
  setLocalTaskList(taskArray);
  console.log(
    getLocalTaskList("taskList"),
    "in addTasktoList method from Localstorage"
  );
  return getLocalTaskList("taskList");
}

function deleteTaskFromList(taskObjID) {
  taskObjID = parseInt(taskObjID, 10);
  let taskItems = getLocalTaskList("taskList");
  console.log(taskItems, taskObjID, "before tasks deleted");
  let deleteItemIndex = taskItems.findIndex((taskItem) => {
    return taskItem.id === taskObjID;
  });
  console.log(deleteItemIndex, "deleteItemIndex at 103");
  taskItems.splice(deleteItemIndex, 1);
  setLocalTaskList(taskItems);
  console.log("after deleted", taskList);
  showToast(`Deleted successfully`);
  return getLocalTaskList("taskList");
}

function saveTask(taskItem, taskKey, e, _taskValue) {
  taskItem[taskKey] = e.target.value;
  console.log(e.target.value, taskKey, taskItem);

  return taskItem;
}

function resetValues(taskItem) {
  taskItem.id = 0;
  taskItem.title = "";
  taskItem.content = "";
  taskItem.setTime = new Date();
  taskItem.isDone = false;
  taskItem.background = "#000fff";
  taskTitle.value = ``;
  taskContent.value = ``;
  return taskItem;
}

function setLocalTaskList(taskList) {
  return localStorage.setItem("taskList", JSON.stringify(taskList));
}

function getLocalTaskList(taskListKey) {
  return JSON.parse(localStorage.getItem(taskListKey));
}

function showToast(message) {
  toastBar.innerHTML = message;
  toastBar.className = "toast show";
  return setTimeout(() => {
    toastBar.className = toastBar.className.replace(
      "toast show",
      "toast visibility"
    );
  }, 2000);
}

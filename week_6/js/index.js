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

let taskList = [];

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
    // let taskToBeAdded = taskList[taskList.length - 1];
    let taskToBeAdded = task;
    addTaskToDisplay(taskToBeAdded);
    resetValues(task);
  },
  false
);

function addTaskToDisplay(taskObject) {
  let taskItem = document.createElement("li");
  let deleteTaskButton = document.createElement("button");
  let deleteIcon = document.createElement("em");

  taskItem.setAttribute("id", taskObject.id);
  deleteTaskButton.setAttribute("class", "delete-task");
  deleteIcon.className = "fa-solid fa-trash";

  taskItem.innerHTML = `${taskObject.title} ${taskObject.content}`;

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
  taskItem.appendChild(deleteTaskButton);
  taskListBox.appendChild(taskItem);
  showToast(`${taskObject.title || "Untitled"} saved successfully`);
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
  console.log(taskArray, "in addTasktoList method");
  return taskArray;
}

function deleteTaskFromList(taskObjID) {
  console.log(taskList, taskObjID, "before tasks deleted");
  let filteredList = taskList.filter((taskItem) => taskItem.id !== taskObjID);
  taskList = filteredList;
  console.log("after deleted", taskList);
  showToast(`Deleted successfully`);
  return taskList;
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

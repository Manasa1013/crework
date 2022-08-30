const taskTitle = document.querySelector("#task-title");
const taskContent = document.querySelector("#task-content");
const saveTaskButton = document.querySelector("#save-task");
const taskListBox = document.querySelector("#task-list-box");
const toastBar = document.querySelector("#toast-bar");
const editCard = document.querySelector(".edit-position.task-card");

const body = document.querySelector("body");
const editWrapper = document.querySelector(".edit-wrapper");

let task = {
  id: 0,
  title: ``,
  content: ``,
  setTime: new Date(),
  background: "#000fff",
  isDone: false,
};

let taskList = getLocalTaskList("taskList") || [];
function renderList(arr) {
  if (arr.length > 0) {
    for (let i = 0; i < arr.length; i++) {
      addTaskToDisplay(arr[i]);
    }
  }
}
//displaying the taskList
renderList(taskList);
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

editWrapper.addEventListener("click", (e) => {
  console.log(e.target);
  if (e.target === editWrapper) {
    editWrapper.classList = ["edit-wrapper visibility"];
  }
});

saveTaskButton.addEventListener(
  "click",
  () => {
    taskList = addTaskToList(task, taskList);
    console.log({ taskList }, "in saving task");
    let taskToBeAdded = taskList[taskList.length - 1];
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
  let doneTaskButton = document.createElement("button");

  let deleteIcon = document.createElement("em");
  let editIcon = document.createElement("em");
  let doneIcon = document.createElement("em");

  taskItem.setAttribute("id", taskObject.id);
  taskItem.className = `${taskObject.isDone ? "task-card done" : "task-card"}`;
  console.log(`${taskObject.isDone ? "task-card done" : "task-card"}`);
  deleteTaskButton.setAttribute("class", "icon-task button icon-button");
  editTaskButton.setAttribute("class", "icon-task button icon-button");
  doneTaskButton.setAttribute("class", "icon-task button icon-button");

  deleteIcon.className = "fa-solid fa-trash";
  editIcon.className = "fa-solid fa-edit";
  doneIcon.className = "fa-solid fa-square-check";

  taskItem.innerHTML = `<h3 class="task__header--display" id="display-header">${taskObject.title}</h3><p class="task__content--display" id="display-content"> ${taskObject.content} </p>`;

  deleteTaskButton.addEventListener("click", (e) => {
    console.log(e.target.parentElement.parentElement.id);
    let deleteItem = document.getElementById(
      e.target.parentElement.parentElement.id
    );
    deleteTaskFromList(e.target.parentElement.parentElement.id);
    let deletedItem = taskListBox.removeChild(deleteItem);
    console.log(deletedItem);
  });

  editTaskButton.addEventListener(
    "click",
    (e) => {
      e.preventDefault();
      editWrapper.classList = ["edit-wrapper"];
      let taskToBeEditedID = e.target.parentElement.parentElement.id;
      let taskListFromLocalStorage = getLocalTaskList("taskList");

      editCard.setAttribute("id", taskToBeEditedID);

      taskToBeEditedID = parseInt(taskToBeEditedID, 10);
      let taskToBeEdited = findElement(
        taskToBeEditedID,
        taskListFromLocalStorage
      );
      let taskToBeEditedIndex = taskListFromLocalStorage.findIndex(
        (item) => item.id === taskToBeEditedID
      );
      console.log(taskToBeEdited);
      console.log(editCard);
      editCard.children["display-header"].value = taskToBeEdited.title;
      editCard.children["display-content"].value = taskToBeEdited.content;
      editCard.children["display-header"].addEventListener("change", (e) => {
        taskToBeEdited = saveTask(taskToBeEdited, "title", e);
      });
      editCard.children["display-content"].addEventListener("change", (e) => {
        taskToBeEdited = saveTask(taskToBeEdited, "content", e);
      });
      editCard.children["display-header"].value = taskToBeEdited.title;
      editCard.children["display-content"].value = taskToBeEdited.content;
      console.log(taskToBeEdited, "after editing inputs");

      let taskToBeEditedNode = document.getElementById(taskToBeEditedID);
      console.log(taskToBeEditedNode, "node of editable task");
      taskToBeEditedNode.children["display-header"].value =
        taskToBeEdited.title;
      taskToBeEditedNode.children["display-content"].value =
        taskToBeEdited.content;

      let newTask = { ...taskToBeEdited, id: Date.now() };

      taskListFromLocalStorage = deleteTaskFromList(taskToBeEdited);
      console.log(taskListFromLocalStorage);
      taskListFromLocalStorage = addTaskToList(
        newTask,
        taskListFromLocalStorage
      );
      console.log(taskListFromLocalStorage);
      /*
       * firstly, when edit button clicked, editcard pops up using css.
       * edit card input values filled with the respective task values.
       * after changing inputs,using save task , the taskinput and taskcontent are changed.
       * Now , the task values in the respective node are to be the new task values.
       * For that, copy editableTask values into newTask with new date ,as it's changed.
       * the newTask has to be entered into localstorage using splice and old editTask has to be deleted.
       * the editTask has to be removed from display too, using removeChild.
       * now addTaskToDisplay(newTask) do, this adds newTask into taskList as well as localstorgae.
       * I think , it to be added to DISPLAY also.
       */
    },

    false
  );

  doneTaskButton.addEventListener("click", (e) => {
    let taskDoneToBeToggledID = e.target.parentElement.parentElement.id;
    taskDoneToBeToggledID = parseInt(taskDoneToBeToggledID, 10);
    let taskDoneToBeToggledNode = document.getElementById(
      taskDoneToBeToggledID
    );
    let taskListFromLocalStorage = getLocalTaskList("taskList");

    let taskDoneToBeToggled = taskListFromLocalStorage.find(
      (item) => item.id === taskDoneToBeToggledID
    );
    taskDoneToBeToggled.isDone = !taskDoneToBeToggled.isDone;
    taskDoneToBeToggledNode.setAttribute(
      "class",
      `${taskDoneToBeToggled.isDone ? "task-card done" : "task-card"}`
    );
    showToast(`${taskDoneToBeToggled.title} updated`);

    setLocalTaskList(taskListFromLocalStorage);

    // return getLocalTaskList(taskListFromLocalStorage);
  });

  deleteTaskButton.appendChild(deleteIcon);
  editTaskButton.appendChild(editIcon);
  doneTaskButton.appendChild(doneIcon);
  taskItem.appendChild(deleteTaskButton);
  taskItem.appendChild(editTaskButton);
  taskItem.appendChild(doneTaskButton);
  taskListBox.appendChild(taskItem);
}

function addTaskToList(taskObj, taskArray) {
  console.log(taskObj, taskArray, "from addtasktolist");
  // if (taskObj.content.length <= 0) return taskArray;
  taskArray = [
    {
      ...taskObj,
      id: Date.now(),
      title: taskObj.title || "Untitled",
    },
    ...taskArray,
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

function findElement(taskID, arr) {
  return arr.find((item) => item.id === taskID);
}

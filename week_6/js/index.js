const taskTitle = document.querySelector("#task-title");
const taskContent = document.querySelector("#task-content");
const saveTaskButton = document.querySelector("#save-task");
const taskListBox = document.querySelector("#task-list-box");
const fragment = document.createDocumentFragment();

let task = {
  title: taskTitle.value,
  content: taskContent.value,
  setTime: new Date(),
  background: "#000fff",
  isDone: false,
};

let taskList = [];

taskTitle.addEventListener(
  "change",
  (e) => {
    saveTask("title", e);
  },
  false
);

taskContent.addEventListener(
  "change",
  (e) => {
    saveTask("content", e);
  },
  false
);

saveTaskButton.addEventListener(
  "click",
  () => {
    taskList = addTaskToList(task, taskList);
    console.log({ taskList });
    addTaskToDisplay(task.title, task.content);
    resetValues(task);
  },
  false
);
function addTaskToDisplay(title, content) {
  let taskItemTemplate = fragment.appendChild(document.createElement("li"));

  taskItemTemplate.innerHTML = `<span>${title}  ${content}</span>`;

  taskListBox.appendChild(fragment);
}

function addTaskToList(taskObj, taskArray) {
  taskArray = [...taskArray, taskObj];
  return taskArray;
}

function saveTask(taskKey, e, _taskValue) {
  console.log(e.target.value, taskKey);
  task = { ...task, [taskKey]: e.target.value };
  return task;
}

function resetValues(taskItem) {
  taskItem = {
    ...taskItem,
    title: "",
    content: "",
    setTime: new Date(),
    isDone: false,
    background: "#000fff",
  };
  taskTitle.value = taskItem.title;
  taskContent.value = taskItem.content;
  return taskItem;
}

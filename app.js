const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const incompleteTasksList = document.getElementById('incomplete-tasks');
const completedTasksList = document.getElementById('completed-tasks');

const createTaskElement = function (taskText) {
  const taskItem = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  const label = document.createElement('label');
  label.innerText = taskText;
  label.className = 'task';

  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'task';

  const editButton = document.createElement('button');
  editButton.innerText = 'Edit';
  editButton.className = 'edit';

  const deleteIcon = document.createElement('img');
  deleteIcon.src = './remove.svg';

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete';
  deleteButton.appendChild(deleteIcon);

  taskItem.append(checkbox, label, editInput, editButton, deleteButton);
  return taskItem;
};

const addTask = function () {
  if (!newTaskInput.value) return;
  const taskItem = createTaskElement(newTaskInput.value);

  incompleteTasksList.appendChild(taskItem);
  bindTaskEvents(taskItem, completeTask);

  newTaskInput.value = '';
};

const editTask = function () {
  const taskItem = this.parentNode;
  const editInput = taskItem.querySelector('input[type=text]');
  const label = taskItem.querySelector('label');
  const editBtn = taskItem.querySelector('.edit');
  const isEditing = taskItem.classList.contains('editMode');

  if (isEditing) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  taskItem.classList.toggle('editMode');
};

const deleteTask = function () {
  const taskItem = this.parentNode;
  const taskList = taskItem.parentNode;
  taskList.removeChild(taskItem);
};

const moveTask = function (taskItem, targetList, checkboxHandler) {
  targetList.appendChild(taskItem);
  bindTaskEvents(taskItem, checkboxHandler);
};

const completeTask = function () {
  const taskItem = this.parentNode;
  moveTask(taskItem, completedTasksList, reopenTask);
};

const reopenTask = function () {
  const taskItem = this.parentNode;
  moveTask(taskItem, incompleteTasksList, completeTask);
};

addTaskButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskListItem, checkboxHandler) {
  const checkbox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = checkboxHandler;
};

const bindTasksInList = function (taskList, checkboxHandler) {
  for (let i = 0; i < taskList.children.length; i++) {
    bindTaskEvents(taskList.children[i], checkboxHandler);
  }
};

bindTasksInList(incompleteTasksList, completeTask);
bindTasksInList(completedTasksList, reopenTask);

//TODO: prevent creation of empty tasks (containing only whitespaces).

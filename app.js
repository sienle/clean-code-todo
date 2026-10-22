//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const newTaskInput = document.getElementById('new-task'); //Add a new task.
const addTaskButton = document.getElementsByTagName('button')[0]; //first button
const incompleteTasksList = document.getElementById('incomplete-tasks'); //ul of #incomplete-tasks
const completedTasksList = document.getElementById('completed-tasks'); //completed-tasks

//New task list item
const createTaskElement = function (taskText) {
  const taskItem = document.createElement('li');

  //input (checkbox)
  const checkbox = document.createElement('input'); //checkbx
  //label
  const label = document.createElement('label'); //label
  //input (text)
  const editInput = document.createElement('input'); //text
  //button.edit
  const editButton = document.createElement('button'); //edit button

  //button.delete
  const deleteButton = document.createElement('button'); //delete button
  const deleteIcon = document.createElement('img'); //delete button image

  label.innerText = taskText;
  label.className = 'task';

  //Each elements, needs appending
  checkbox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteIcon.src = './remove.svg';
  deleteButton.appendChild(deleteIcon);

  //and appending.
  taskItem.appendChild(checkbox);
  taskItem.appendChild(label);
  taskItem.appendChild(editInput);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);
  return taskItem;
};

const addTask = function () {
  //Create a new list item with the text from the #new-task:
  if (!newTaskInput.value) return;
  const taskItem = createTaskElement(newTaskInput.value);

  //Append taskItem to incompleteTasksList
  incompleteTasksList.appendChild(taskItem);
  bindTaskEvents(taskItem, completeTask);

  newTaskInput.value = '';
};

//Edit an existing task.

const editTask = function () {
  const taskItem = this.parentNode;

  const editInput = taskItem.querySelector('input[type=text]');
  const label = taskItem.querySelector('label');
  const editBtn = taskItem.querySelector('.edit');
  const hasClass = taskItem.classList.contains('editMode');
  //If class of the parent is .editmode
  if (hasClass) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  //toggle .editmode on the parent.
  taskItem.classList.toggle('editMode');
};

//Delete task.
const deleteTask = function () {
  const taskItem = this.parentNode;
  const taskList = taskItem.parentNode;
  //Remove the parent list item from the taskList.
  taskList.removeChild(taskItem);
};

const moveTask = function (taskItem, targetList, checkboxHandler) {
  targetList.appendChild(taskItem);
  bindTaskEvents(taskItem, checkboxHandler);
};

//Mark task completed
const completeTask = function () {
  //Append the task list item to the #completed-tasks
  const taskItem = this.parentNode;
  moveTask(taskItem, completedTasksList, reopenTask);
};

const reopenTask = function () {
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incomplete-tasks.
  const taskItem = this.parentNode;
  moveTask(taskItem, incompleteTasksList, completeTask);
};

//The glue to hold it all together.

//Set the click handler to the addTask function.
addTaskButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskListItem, checkboxHandler) {
  //select ListItems children
  const checkbox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind completeTask to checkboxHandler.
  checkbox.onchange = checkboxHandler;
};

const bindTasksInList = function (taskList, checkboxHandler) {
  for (let i = 0; i < taskList.children.length; i++) {
    bindTaskEvents(taskList.children[i], checkboxHandler);
  }
};

//cycle over incompleteTasksList ul list items
//for each list item
bindTasksInList(incompleteTasksList, completeTask);

//cycle over completedTasksList ul list items
bindTasksInList(completedTasksList, reopenTask);

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.

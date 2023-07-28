"use strict";
const retrieveTasks = () => {
    const completedTasks = document.getElementById('incompletas');
    const incompleteTasks = document.getElementById('completas');

    const persistedCompleted = localStorage.getItem('completedTasks');
    const persistedIncomplete = localStorage.getItem('incompleteTasks');

    completedTasks.innerHTML = persistedCompleted;
    incompleteTasks.innerHTML = persistedIncomplete;
}

retrieveTasks();
const tasksContainer = document.querySelector('#incompletas');
const inputTarefa = document.querySelector("#nova-tarefa");
function userInputVerify() {
    if (inputTarefa.value.trim()) {
        addTask();
    }
    else {
        console.log("No value");
    }
}

function addTask() {
    //Container
    const taskItemContainer = document.createElement('li');
    taskItemContainer.classList.add('task-item');

    //Checkbox
    const taskCheckbox = document.createElement('input');
    taskCheckbox.setAttribute("type", "checkbox");
    taskCheckbox.addEventListener('click', () => handleClick(taskCheckbox));

    //Texto
    const taskContent = document.createElement('p');
    taskContent.classList.add('task-name');
    taskContent.innerText = inputTarefa.value;

    //Botão apagar 
    const taskDelete = document.createElement('button');
    taskDelete.classList.add('task-delete-button');
    taskDelete.innerText = "Apagar";
    taskDelete.addEventListener('click', (event) => handleDeleteClick(event.target));

    //Botão editar
    const taskEdit = document.createElement('button');
    taskEdit.classList.add('task-edit-button');
    taskEdit.innerText = "Editar";
    taskEdit.addEventListener('click', (event) => handleEditClick(event.target));

    //Adicionando os elementos a div
    taskItemContainer.appendChild(taskCheckbox);
    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(taskDelete);
    taskItemContainer.appendChild(taskEdit);

    //Adicionando a div na div de tarefas 
    tasksContainer.appendChild(taskItemContainer);
    inputTarefa.value = "";
    saveTasks();
}

const handleClick = (taskCheckbox) => {
    var _a;
    const tasks = (tasksContainer === null || tasksContainer === void 0 ? void 0 : tasksContainer.childNodes);
    for (const task of tasks) {
        if ((_a = task.firstChild) === null || _a === void 0 ? void 0 : _a.isSameNode(taskCheckbox)) {
            const completTarefa = document.querySelector("#completas");
            completTarefa.appendChild(task);
        }
    }
    saveTasks();
};

const handleDeleteClick = (task) => {
    const parentTask = task.parentElement;
    parentTask.remove();
    saveTasks();
};

const handleEditClick = (task) => {
    const parentTask = task.parentElement;
    const taskName = parentTask.querySelector('.task-name').innerText;
    
    const input = document.createElement('input');
    input.setAttribute("type", "text");
    input.setAttribute("type", "input-task-name");
    input.setAttribute("placeholder", taskName);
    
    parentTask.appendChild(input);
    input.addEventListener("keydown", (event) => changeTaskName(event, parentTask, input));
    saveTasks();
}

const changeTaskName = (event, parent, input) => {
    if (event.key === "Enter") {
        if (event.target.value.trim()) {
            parent.querySelector('.task-name').innerText = event.target.value;
            input.remove();
            saveTasks();
        }
        else {
            console.log("No value");
        }
    }

    if (event.key === "Escape") {
        input.remove();
    }
}

const saveTasks = () => {
    const completedTasks = document.getElementById('incompletas').innerHTML;
    const incompleteTasks = document.getElementById('completas').innerHTML;

    localStorage.setItem('completedTasks', completedTasks);
    localStorage.setItem('incompleteTasks', incompleteTasks);
}
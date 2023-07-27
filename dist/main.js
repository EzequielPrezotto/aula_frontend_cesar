"use strict";
// dado, quando, então.
const tasksContainer = document.querySelector('.tarefas');
const inputTarefa = document.querySelector("#nova-tarefa");
function userInputVerify() {
    // Given an input 
    if (inputTarefa.value.trim()) {
        addTask();
    }
    else {
        console.log("No value");
    }
}
function addTask() {
    //Container
    const taskItemContainer = document.createElement('Div');
    taskItemContainer.classList.add('task-item');
    //Checkbox
    const taskCheckbox = document.createElement('input');
    taskCheckbox.setAttribute("type", "checkbox");
    taskCheckbox.addEventListener('click', () => handleClick(taskCheckbox));
    //Texto
    const taskContent = document.createElement('p');
    taskContent.innerText = inputTarefa.value;
    //Botão apagar 
    const taskDelete = document.createElement('button');
    taskDelete.classList.add('task-delete-button');
    taskDelete.innerText = "Apagar";
    taskDelete.addEventListener('click', () => handleDeleteClick());
    //Botão editar
    const taskEdit = document.createElement('button');
    taskEdit.classList.add('task-edit-button');
    taskEdit.innerText = "Editar";
    //Adicionando os elementos a div
    taskItemContainer.appendChild(taskCheckbox);
    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(taskDelete);
    taskItemContainer.appendChild(taskEdit);
    //Adicionando a div na div de tarefas 
    tasksContainer.appendChild(taskItemContainer);
    inputTarefa.value = "";
}
const handleClick = (taskCheckbox) => {
    var _a;
    const tasks = (tasksContainer === null || tasksContainer === void 0 ? void 0 : tasksContainer.childNodes);
    console.log(tasks);
    for (const task of tasks) {
        console.log(task);
        if ((_a = task.firstChild) === null || _a === void 0 ? void 0 : _a.isSameNode(taskCheckbox)) {
            const completTarefa = document.querySelector(".tarefas-completas");
            completTarefa.appendChild(task);
        }
    }
};
const handleDeleteClick = () => {
};

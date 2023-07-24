"use strict";
let tarefas = [];
let contador = 0;
function addTask() {
    const taskInput = document.getElementById("nova-tarefa");
    const tarefa_texto = taskInput.value.trim();
    if (tarefa_texto === "")
        return;
    const task = {
        id: contador++,
        tarefa_texto: tarefa_texto,
        completa: false,
    };
    tarefas.push(task);
    mostrarLista();
    taskInput.value = "";
}
function rmTask(taskId) {
    tarefas = tarefas.filter((task) => task.id !== taskId);
    mostrarLista();
}
function toggleCompleted(taskId) {
    tarefas = tarefas.map((task) => {
        if (task.id === taskId) {
            return Object.assign(Object.assign({}, task), { completa: !task.completa });
        }
        return task;
    });
    mostrarLista();
}
function mostrarLista() {
    const tarefasIncompletas = document.getElementById("incompletas");
    const tarefasCompletas = document.getElementById("completas");
    tarefasIncompletas.innerHTML = "";
    tarefasCompletas.innerHTML = "";
    tarefas.forEach((task) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" ${task.completa ? "checked" : ""} onchange="toggleCompleted(${task.id})">
            <label>${task.tarefa_texto}</label>
            <button onclick="rmTask(${task.id})"  class="apagar">Apagar</button>
        `;
        if (task.completa) {
            tarefasCompletas.appendChild(li);
        }
        else {
            tarefasIncompletas.appendChild(li);
        }
    });
}
mostrarLista();

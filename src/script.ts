interface Task {
    id: number;
    tarefa_texto: string;
    completa: boolean;
}

let tarefas: Task[] = [];
let contador = 0;

function addTask() {
    const taskInput = document.getElementById("nova-tarefa") as HTMLInputElement;
    const tarefa_texto = taskInput.value.trim();
    if (tarefa_texto === "") return;

    const task: Task = {
        id: contador++,
        tarefa_texto: tarefa_texto,
        completa: false,
    };

    tarefas.push(task);
    saveTasksToLocalStorage();
    mostrarLista();
    taskInput.value = "";
}

function rmTask(taskId: number) {
    tarefas = tarefas.filter((task) => task.id !== taskId);
    saveTasksToLocalStorage();
    mostrarLista();
}

function toggleCompleted(taskId: number) {
    tarefas = tarefas.map((task) => {
        if (task.id === taskId) {
            console.log(task.id)
            return { ...task, completa: !task.completa };
        }
        return task;
    });

    saveTasksToLocalStorage();
    mostrarLista();
}

function saveTasksToLocalStorage() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function getTasksFromLocalStorage() {
    const tasksData = localStorage.getItem("tarefas");
    tarefas = tasksData ? JSON.parse(tasksData) : [];
    contador = tarefas.length + 1
}

function mostrarLista() {
    const tarefasIncompletas = document.getElementById("incompletas") as HTMLUListElement;
    const tarefasCompletas = document.getElementById("completas") as HTMLUListElement;
    tarefasIncompletas.innerHTML = "";
    tarefasCompletas.innerHTML = "";

    tarefas.forEach((task) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" ${task.completa ? "checked" : ""} onchange="toggleCompleted(${task.id})">
            <label> ${task.completa ? "<s>" : ""} ${task.tarefa_texto} ${task.completa ? "</s>" : ""}</label>
            <button onclick="rmTask(${task.id})"  class="apagar">Apagar</button>
        `;
        
        if(task.completa){
            tarefasCompletas.appendChild(li);
        }else{
            tarefasIncompletas.appendChild(li);
        }
        
    });  
}

getTasksFromLocalStorage();
mostrarLista();

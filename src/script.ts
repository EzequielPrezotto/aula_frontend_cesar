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
    mostrarLista();
    taskInput.value = "";
}

function rmTask(taskId: number) {
    tarefas = tarefas.filter((task) => task.id !== taskId);
    mostrarLista();
}

function toggleCompleted(taskId: number) {
    tarefas = tarefas.map((task) => {
        if (task.id === taskId) {
            return { ...task, completa: !task.completa };
        }
        return task;
    });
    mostrarLista();
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
            <label>${task.tarefa_texto}</label>
            <button onclick="rmTask(${task.id})"  class="apagar">Apagar</button>
        `;
        
        if(task.completa){
            tarefasCompletas.appendChild(li);
        }else{
            tarefasIncompletas.appendChild(li);
        }
        
    });
}

mostrarLista();

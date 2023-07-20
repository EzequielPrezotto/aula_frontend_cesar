let novaTarefaInput = document.getElementById('nova-tarefa') as HTMLInputElement;
let botaoAdicionar = document.getElementById('botao-adicionar');
let listaTarefasIncompletas = document.getElementById('incompletas');
let tarefasCompletas = document.getElementById('completas');
let botaoApagar = document.getElementsByClassName('apagar');
let botaoEditar = document.getElementsByClassName('editar')

type Tarefa = {
    descricao: string;
    realizada: boolean;
}

let tarefas: Tarefa[];

window.onload = () => {
    tarefas = JSON.parse(localStorage.getItem("tarefas"));
    for (let i = 0; i < tarefas.length; i++) {
        tarefas[i].realizada === false ? 
            listaTarefasIncompletas.appendChild(criarTarefa(tarefas[i].descricao, tarefas[i].realizada)) 
            : 
            tarefasCompletas.appendChild(criarTarefa(tarefas[i].descricao, tarefas[i].realizada)) 
    }
}

let criarTarefa = function (descricaoTarefa: string, realizada: boolean) {
    let tarefa = document.createElement("li");

    let checkbox = document.createElement("input");
    let label = document.createElement("label");
    let botaoApagar = document.createElement("button");
    let botaoEditar = document.createElement("button");

    checkbox.type = 'checkbox';
    checkbox.checked = realizada;

    checkbox.onclick = () => {
        tarefas.forEach((tarefa) => {
            if (tarefa.descricao === descricaoTarefa) {
                tarefa.realizada = checkbox.checked;
            }
        });
        currentStateToLocalStorage();
        location.reload();
    }

    botaoApagar.className = 'apagar';
    botaoApagar.innerText = 'Apagar';

    botaoApagar.onclick = () => {
        botaoApagar.parentElement.remove();
        tarefas = tarefas.filter((element) => element.descricao !== descricaoTarefa);
        currentStateToLocalStorage();
    }

    label.innerText = descricaoTarefa;

    botaoEditar.className = 'editar';
    botaoEditar.innerText = 'Editar';

    botaoEditar.onclick = () => {
        botaoEditar.parentElement.remove();
        tarefas = tarefas.filter((element) => element.descricao !== descricaoTarefa);
        currentStateToLocalStorage();
        novaTarefaInput.value = descricaoTarefa;
    }

    tarefa.appendChild(checkbox);
    tarefa.appendChild(label);
    tarefa.appendChild(botaoApagar);
    tarefa.appendChild(botaoEditar)

    return tarefa;
}

function validaTextoTarefa(texto: string) {
    return texto.length > 0;
}

let adicionaTarefa = function () {
    if (validaTextoTarefa(novaTarefaInput.value)) {
        let tarefa = criarTarefa(novaTarefaInput.value, false);
        listaTarefasIncompletas.appendChild(tarefa);

        tarefas.push({ descricao: novaTarefaInput.value, realizada: false });
        currentStateToLocalStorage();
    }
    else {
        alert("Insira uma tarefa no campo de texto");
    }

    novaTarefaInput.value = "";
}

botaoAdicionar.addEventListener('click', adicionaTarefa);

function currentStateToLocalStorage() {
    let tarefasString = JSON.stringify(tarefas);
    localStorage.setItem("tarefas", tarefasString);
}
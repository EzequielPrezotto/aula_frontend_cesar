let novaTarefaInput = document.getElementById('nova-tarefa');
let botaoAdicionar = document.getElementById('botao-adicionar');
let botoesApagar = document.getElementsByClassName('apagar');
let listaTarefasIncompletas = document.getElementById('incompletas');

let criarTarefa = function (descricaoTarefa) {
    let tarefa = document.createElement("li");

    let checkbox = document.createElement("input");
    let label = document.createElement("label");
    let botaoApagar = document.createElement("button");

    checkbox.type = 'checkbox';
    botaoApagar.className = 'apagar';
    botaoApagar.innerText = 'Apagar';
    label.innerText = descricaoTarefa;
    
    tarefa.appendChild(checkbox);
    tarefa.appendChild(label);
    tarefa.appendChild(botaoApagar);

    return tarefa
}

function validateTextoTarefa(texto) {
    return texto.length > 0;
}

let adicionaTarefa = function () {
    if (validateTextoTarefa(novaTarefaInput.value)) {
        let tarefa = criarTarefa(novaTarefaInput.value);
        listaTarefasIncompletas.appendChild(tarefa);
        apagarTarefa()
    }
}

let apagarTarefa = function () {
    for (const botaoApagar of botoesApagar) {
        botaoApagar.addEventListener('click', (event) => {
            event.target.parentNode.remove();
        })
    };
}

apagarTarefa();
botaoAdicionar.addEventListener('click', adicionaTarefa);

let novaTarefaInput = document.getElementById('nova-tarefa');
let botaoAdicionar = document.getElementById('botao-adicionar');
let listaTarefasIncompletas = document.getElementById('incompletas');

let criarTarefa = function (descricaoTarefa) {
    // <li>
    //     <input type="checkbox">
    //     <label>Pagar as contas</label>
    //     <button className="apagar">Apagar</button>
    // </li>

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

function validaTextoTarefa(texto) {
    return texto.length > 0;
}

let adicionaTarefa = function () {
    if (validaTextoTarefa(novaTarefaInput.value)) {
        let tarefa = criarTarefa(novaTarefaInput.value)
        listaTarefasIncompletas.appendChild(tarefa);
    }
}


botaoAdicionar.addEventListener('click', adicionaTarefa);
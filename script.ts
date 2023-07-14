let novaTarefaInput = document.getElementById('nova-tarefa') as HTMLInputElement;
let botaoAdicionar = document.getElementById('botao-adicionar');
let botoesEditar = document.getElementsByClassName('editar');
let botoesApagar = document.getElementsByClassName('apagar');
let listaTarefasIncompletas = document.getElementById('incompletas');
let listaTarefasCompletas = document.getElementById('completas');
let todosInput = document.getElementsByTagName('input');

let criarTarefa = function (descricaoTarefa: string) {
    let tarefa = document.createElement("li");

    let checkbox = document.createElement("input");
    let label = document.createElement("label");
    let botaoEditar = document.createElement("button");
    let botaoApagar = document.createElement("button");

    checkbox.type = 'checkbox';
    botaoApagar.className = 'apagar';
    botaoEditar.innerText = 'Editar';
    botaoEditar.className = 'editar';
    botaoApagar.innerText = 'Apagar';
    label.innerText = descricaoTarefa;
    
    tarefa.appendChild(checkbox);
    tarefa.appendChild(label);
    tarefa.appendChild(botaoEditar);
    tarefa.appendChild(botaoApagar);

    return tarefa
}

function validateTextoTarefa(texto: string) {
    return texto.length > 0;
}

let adicionaTarefa = function () {
    if (validateTextoTarefa(novaTarefaInput.value)) {
        let tarefa = criarTarefa(novaTarefaInput.value);
        listaTarefasIncompletas?.appendChild(tarefa);
        apagarTarefa();
        mudarStatusTarefa();
        editarTarefa();
    }
}

let apagarTarefa = function () {
    for (const botaoApagar of botoesApagar) {
        botaoApagar.addEventListener('click', (event) => {
            let parent = (<HTMLElement>event.target).parentElement;
            parent.remove();
        })
    };
}

let editarTarefa = function () {
    for (const botaoEditar of botoesEditar) {
        botaoEditar.addEventListener('click', (event) => {
            let parent = (<HTMLElement>event.target).parentElement;

            if (!(parent.children[1].tagName === 'INPUT')) {
                let campoEdicao = document.createElement("input");
                campoEdicao.type = 'text';
                campoEdicao.value = parent.children[1].innerHTML;    
                parent.replaceChild(campoEdicao, parent.children[1]);

                parent.children[1].addEventListener('keypress', (event: KeyboardEvent) => {
                    const campoEdicaoValue = (parent.children[1] as HTMLInputElement).value

                    if (event.key === 'Enter' && validateTextoTarefa(campoEdicaoValue)) {
                        let label = document.createElement("label");
                        label.innerText = campoEdicaoValue;
                        parent.replaceChild(label, parent.children[1]); 
                    }
                })               
            }
        })
    };
}

let mudarStatusTarefa = function () {
    for (const input of todosInput) {
        if (input.type === 'checkbox') {
            input.addEventListener('click', (event) => {
                const checkboxInput = event.target as HTMLInputElement;
                const parentElement = checkboxInput.parentElement;
                if (checkboxInput.checked) {
                    parentElement.remove()
                    listaTarefasCompletas?.appendChild(parentElement);

                } else {
                    parentElement.remove()
                    listaTarefasIncompletas?.appendChild(parentElement);
                }
            })
        }
    };
}

apagarTarefa();
editarTarefa();
mudarStatusTarefa();
botaoAdicionar?.addEventListener('click', adicionaTarefa);

interface Tarefa {
    id: number,
    descricao: string,
    status: boolean
};

let novaTarefaInput = document.getElementById('nova-tarefa') as HTMLInputElement;
let botaoAdicionar = document.getElementById('botao-adicionar');
let botoesEditar = document.getElementsByClassName('editar');
let botoesApagar = document.getElementsByClassName('apagar');
let listaTarefasIncompletas = document.getElementById('incompletas');
let listaTarefasCompletas = document.getElementById('completas');
let todosInput = document.getElementsByTagName('input');
let listaTarefas: Tarefa[] = JSON.parse(localStorage.getItem("listaTarefas") || "[]");

const nome: string ='nome';

let criarTarefa = function (tarefa: Tarefa) {
    if (!listaTarefas.some(t => t.id === tarefa.id)) {
        listaTarefas.push(tarefa);
        localStorage.setItem('listaTarefas', JSON.stringify(listaTarefas));
    }

    let tarefaWrapper = document.createElement("li");

    let checkbox = document.createElement("input");
    let label = document.createElement("label");
    let botaoEditar = document.createElement("button");
    let botaoApagar = document.createElement("button");

    tarefaWrapper.id = `${tarefa.id}`;
    checkbox.type = 'checkbox';
    botaoApagar.className = 'apagar';
    botaoEditar.innerText = 'Editar';
    botaoEditar.className = 'editar';
    botaoApagar.innerText = 'Apagar';
    label.innerText = tarefa.descricao;
        
    if (tarefa.status) {
        checkbox.checked = true;
    };
    
    tarefaWrapper.appendChild(checkbox);
    tarefaWrapper.appendChild(label);
    tarefaWrapper.appendChild(botaoEditar);
    tarefaWrapper.appendChild(botaoApagar);

    return tarefaWrapper
}

function validateTextoTarefa(texto: string) {
    return texto.length > 0;
}

let adicionaTarefa = function () {
    const proximoId = listaTarefas.length ? Math.max.apply(null, listaTarefas.map(t => t.id)) : 0; 
    if (validateTextoTarefa(novaTarefaInput.value)) {
        const tarefa: Tarefa = {
            id: proximoId + 1,
            descricao: novaTarefaInput.value,
            status: false
        };

        let tarefaElement = criarTarefa(tarefa);
        listaTarefasIncompletas?.appendChild(tarefaElement);
        apagarTarefa();
        mudarStatusTarefa();
        editarTarefa();
        novaTarefaInput.value = "";
    }
}

let apagarTarefa = function () {
    for (const botaoApagar of botoesApagar) {
        botaoApagar.addEventListener('click', (event) => {
            let parent = (<HTMLElement>event.target).parentElement;
            listaTarefas = listaTarefas.filter(t => t.id !== +parent.id);
            localStorage.setItem('listaTarefas', JSON.stringify(listaTarefas))
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
                    const campoEdicaoValue = (parent.children[1] as HTMLInputElement).value;

                    if (event.key === 'Enter' && validateTextoTarefa(campoEdicaoValue)) {
                        let label = document.createElement("label");
                        label.innerText = campoEdicaoValue;
                        
                        const tarefaIndex = listaTarefas.findIndex(t => t.id === +parent.id);
                        listaTarefas[tarefaIndex].descricao = campoEdicaoValue;
                        localStorage.setItem('listaTarefas', JSON.stringify(listaTarefas))

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
                    const tarefaIndex = listaTarefas.findIndex(t => t.id === +parentElement.id);
                    listaTarefas[tarefaIndex].status = true;
                    localStorage.setItem('listaTarefas', JSON.stringify(listaTarefas))
                    parentElement.remove()
                    listaTarefasCompletas?.appendChild(parentElement);
                } else {
                    const tarefaIndex = listaTarefas.findIndex(t => t.id === +parentElement.id);
                    listaTarefas[tarefaIndex].status = false;
                    localStorage.setItem('listaTarefas', JSON.stringify(listaTarefas))
                    parentElement.remove()
                    listaTarefasIncompletas?.appendChild(parentElement);
                }
            })
        }
    };
}

if (listaTarefas.length) {
    for (const tarefa of listaTarefas) {
        let tarefaElement = criarTarefa(tarefa);
        if (tarefa.status) {
            listaTarefasCompletas?.appendChild(tarefaElement);
        } else {
            listaTarefasIncompletas?.appendChild(tarefaElement);
        }
    }
    apagarTarefa();
    editarTarefa();
    mudarStatusTarefa();
}
botaoAdicionar?.addEventListener('click', adicionaTarefa);

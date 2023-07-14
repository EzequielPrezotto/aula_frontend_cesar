const todoList: string[] = [];
const completedList: string[] = [];

enum TaskStatus {
    TODO,
    COMPLETED
};

const addTask = () => {
    const task = document.getElementById("new-task") as HTMLInputElement;

    if (task && task.value !== "") {
        todoList.push(task.value);
        refreshTodoList();
    } else {
        return false;
    }
    task.value = "";
}

const handleEvent = (event: KeyboardEvent) => {
    if (event.key.toLowerCase() === 'enter') {
        addTask();
    }
}

const deleteTask = (task: number, flag: number) => {
    flag === TaskStatus.TODO
    ? todoList.splice(task, 1)
    : completedList.splice(task, 1);

    refreshTodoList();
    refreshCompletedList();
}

const checkTask = (task: number) => {
    const temp = todoList.splice(task, 1);

    completedList.push(temp[0]);

    refreshTodoList();
    refreshCompletedList();
}

const uncheckTask = (task: number) => {
    const temp = completedList.splice(task, 1);

    todoList.push(temp[0]);

    refreshTodoList();
    refreshCompletedList();
}

const refreshTodoList = () => {
    const todoTableContainer = document.getElementById("todo-list-container") as HTMLDivElement;
    const todoTable = document.getElementById("todo-list") as HTMLTableElement;

    while (todoTable.rows.length > 0) {
        todoTable.deleteRow(0);
    }

    for (let item of todoList) {
        const row = todoTable.insertRow(-1);
        const cell = row.insertCell(0);
        const index = todoList.indexOf(item);
        cell.innerHTML =
`
<div class="d-flex content-around">
    <div>
        <input id="todo-check-${index}" type="checkbox" onchange="checkTask(${index})">
        <span>${item}</span>
    </div>
    <div>
        <button id="delete-todo-${index}" class="delete-task" onclick="deleteTask(${index}, ${TaskStatus.TODO})">Apagar</button>
    </div>
</div>
`;
    }

    if (todoList.length === 0) {
        todoTableContainer.style.display = "none";
    } else {
        todoTableContainer.style.display = "block";
    }
}

const refreshCompletedList = () => {
    const completedTableContainer = document.getElementById("completed-list-container") as HTMLDivElement;
    const completedTable = document.getElementById("completed-list") as HTMLTableElement;

    while (completedTable.rows.length > 0) {
        completedTable.deleteRow(0);
    }

    for (let item of completedList) {
        const row = completedTable.insertRow(-1);
        const cell = row.insertCell(0);
        const index = completedList.indexOf(item);
        cell.innerHTML =
`
<div class="d-flex content-around">
    <div>
        <input id="completed-check-${index}" type="checkbox" checked onchange="uncheckTask(${index})">
        <span class="completed-task">${item}</span>
    </div>
    <div>
        <button id="delete-completed-${index}" class="delete-task" onclick="deleteTask(${index}, ${TaskStatus.COMPLETED})">Apagar</button>
    </div>
</div>
`;
    }

    if (completedList.length === 0) {
        completedTableContainer.style.display = "none";
    } else {
        completedTableContainer.style.display = "block";
    }
}

refreshTodoList();
refreshCompletedList();
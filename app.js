const todoList = [1, 2, 3, 4, 5];
const completedList = [6, 7, 8, 9, 10];

const TODO = 0;
const COMPLETED = 1;

const addTask = () => {
    const task = document.getElementById("new-task");

    if (task.value !== "") {
        todoList.push(task.value);
        refreshTodoList();
    } else {
        return false;
    }
    task.value = "";
}

const deleteTask = (task, flag) => {
    flag === TODO
    ? todoList.splice(task, 1)
    : completedList.splice(task, 1);

    refreshTodoList();
    refreshCompletedList();
}

const checkTask = (task) => {
    const temp = todoList.splice(task, 1);

    completedList.push(temp[0]);

    refreshTodoList();
    refreshCompletedList();
}

const uncheckTask = (task) => {
    const temp = completedList.splice(task, 1);

    todoList.push(temp[0]);

    refreshTodoList();
    refreshCompletedList();
}

const refreshTodoList = () => {
    const todoTable = document.getElementById("todo-list");

    while (todoTable.rows.length > 0) {
        todoTable.deleteRow(0);
    }

    for (item of todoList) {
        const row = todoTable.insertRow(-1);
        const cell = row.insertCell(0)
        const index = todoList.indexOf(item);
        cell.innerHTML =
`
<div class="d-flex content-around">
    <div>
        <input id="todo-check-${index}" type="checkbox" onchange="checkTask(${index})">
        <span>${item}</span>
    </div>
    <div>
        <button id="delete-todo-${index}" class="delete-task" onclick="deleteTask(${index}, ${TODO})">Apagar</button>
    </div>
</div>
`
    }
}

const refreshCompletedList = () => {
    const completedTable = document.getElementById("completed-list");

    while (completedTable.rows.length > 0) {
        completedTable.deleteRow(0);
    }

    for (item of completedList) {
        const row = completedTable.insertRow(-1);
        const cell = row.insertCell(0)
        const index = completedList.indexOf(item);
        cell.innerHTML =
`
<div class="d-flex content-around">
    <div>
        <input id="completed-check-${index}" type="checkbox" checked onchange="uncheckTask(${index})">
        <span>${item}</span>
    </div>
    <div>
        <button id="delete-completed-${index}" class="delete-task" onclick="deleteTask(${index}, ${COMPLETED})">Apagar</button>
    </div>
</div>
`
    }
}

refreshTodoList();
refreshCompletedList();
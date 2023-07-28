import React, { useState, ChangeEvent } from 'react';
import './App.css';
import { Task } from './interfaces/Task'
import TaskItem from './components/TaskItem';

const loadTaskList = (): Task[] => {
  const data = localStorage.getItem("taskList")
  return JSON.parse(data || "")
}

const App: React.FC = () => {

  const [taskName, setTaskName] = useState<string>("");
  const [taskList, setTaskList] = useState<Task[]>(() => loadTaskList());

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTaskName(event.target.value)
  };

  const handleTaskStatus = (task: Task) => {
    const index = taskList.indexOf(task)
    const updatedTask = {
      name: taskList[index].name,
      completed: !taskList[index].completed
    };
    taskList.splice(index, 1)

    const updatedTaskList = [...taskList, updatedTask]
    localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
    setTaskList(updatedTaskList)
  };

  const handleRemoveTask = (task: Task): void => {
    const filteredTasks = taskList.filter((t) => t.name !== task.name);
    localStorage.setItem("taskList", JSON.stringify(filteredTasks));
    setTaskList(filteredTasks);
  };

  const handleEditTask = (task: Task, newName: string) => {
    const index = taskList.findIndex((t) => t.name === task.name);
    if (index !== -1) {
      const updatedTaskList = [...taskList];
      updatedTaskList[index].name = newName;
      setTaskList(updatedTaskList);
      localStorage.setItem("taskList", JSON.stringify(taskList));
    }
  };

  const addTask = (): void => {
    if (taskName.trim().length > 0) {
      const newTask = {
        name: taskName,
        completed: false
      };
      const updatedTaskList = [...taskList, newTask]
      localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
      setTaskList(updatedTaskList)
      setTaskName("")
    }
  }

  const removeTask = (task: Task): void => {
    const index = taskList.indexOf(task);
    if (index !== -1) {
      const updatedTaskList = [...taskList];
      updatedTaskList.splice(index, 1);
      setTaskList(updatedTaskList);
      localStorage.setItem("taskList", JSON.stringify(taskList));
    }
  };

  function isNotCompleted(element: Task, index: number, array: Task[]) {
    return (element.completed == false)
  }

  function isCompleted(element: Task, index: number, array: Task[]) {
    console.log(element)
    return (element.completed == true)
  }

  return (
    <div className="App">
      <div className='header'>
        <h1>Lista de tarefas</h1>
        <div>
          <input type='text' value={taskName} placeholder='type your task here' onChange={handleChange}/>
          <button onClick={addTask}>add</button>
        </div>
      </div>
      <div className='todoList'>
        <div className='pending'>
          <h1>Pendentes</h1>
          {taskList.filter(isNotCompleted).map( (task: Task, key: number) => {
            return <TaskItem 
            key={key} 
            task={task} 
            onComplete={handleTaskStatus} 
            onRemove={handleRemoveTask}
            onEdit={handleEditTask} 
            />
          })}
        </div>
        <div className='done'>
          <h1>Completas</h1>
          {taskList.filter(isCompleted).map( (task: Task, key: number) => {
            return <TaskItem 
            key={key} 
            task={task} 
            onComplete={handleTaskStatus} 
            onRemove={handleRemoveTask}
            onEdit={handleEditTask} 
            />
          })}
        </div>
      </div>
    </div>
  );
}

export default App;

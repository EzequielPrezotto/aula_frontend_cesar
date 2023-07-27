import React, { useState, ChangeEvent } from 'react';
import './App.css';
import { Task } from './interfaces/Task'
import TaskItem from './components/TaskItem';

const App: React.FC = () => {

  const [taskName, setTaskName] = useState<string>("");
  const [taskList, setTaskList] = useState<Task[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTaskName(event.target.value)
  };

  const addTask = (): void => {
    const newTask = {
      name: taskName,
      completed: false
    };
    setTaskList([...taskList, newTask])
    setTaskName("")
  }

  return (
    <div className="App">
      <div className='header'>
        <input type='text' value={taskName} placeholder='type your task here' onChange={handleChange}/>
        <button onClick={addTask}>add</button>
      </div>
      <div className='todoList'>
        {taskList.map( (task: Task, key: number) => {
          return <TaskItem key={key} task={task}/>
        })}
      </div>
    </div>
  );
}

export default App;

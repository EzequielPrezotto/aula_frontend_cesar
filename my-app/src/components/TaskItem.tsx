import React, { useState } from "react";
import { Task } from '../interfaces/Task';
import './TaskItem.css';

interface Props {
    task: Task;
    onComplete: (task:Task) => void
}

const TaskItem = ({ task, onComplete }: Props) => {

    const [isChecked, setIsChecked] = useState(task.completed);
    const handleOnChange = () => {
        setIsChecked(!isChecked);
        onComplete(task)
    };

    return (
        <div className="TaskItem">
            <input 
            type="checkbox" 
            id={task.name} 
            name="completedCheckbox" 
            checked={isChecked}
            onChange={handleOnChange}/>
            <span>{task.name}</span>
        </div>
    );
}

export default TaskItem
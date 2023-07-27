import React from "react";
import { Task } from '../interfaces/Task';
import './TaskItem.css';

interface Props {
    task: Task;
}

const TaskItem = ({ task }: Props) => {
    return (
        <div className="TaskItem">
            <button>X</button>
            <span>{task.name}</span>
        </div>
    );
}

export default TaskItem
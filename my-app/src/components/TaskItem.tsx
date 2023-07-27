import React from "react";
import { Task } from '../interfaces/Task'

interface Props {
    task: Task;
}

const TaskItem = ({ task }: Props) => {
    return (
        <div className="task">
            <button>X</button>
            <span>{task.name}</span>
        </div>
    );
}

export default TaskItem
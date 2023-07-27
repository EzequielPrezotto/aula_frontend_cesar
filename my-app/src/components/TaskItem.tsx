import React, { useState } from "react";
import { Task } from '../interfaces/Task';
import './TaskItem.css';

interface Props {
    task: Task;
    onComplete: (task:Task) => void
    onRemove: (task: Task) => void
    onEdit: (task: Task, newName: string) => void
}

const TaskItem = ({ task, onComplete, onRemove, onEdit }: Props) => {

    const [isChecked, setIsChecked] = useState(task.completed);
    const [isEditing, setIsEditing] = useState(false); 
    const [editedName, setEditedName] = useState(task.name);

    const handleOnChange = () => {
        setIsChecked(!isChecked);
        onComplete(task)
    };

    const handleRemove = () => {
        onRemove(task);
      };

      const handleEdit = () => {
        if (isEditing) {
          // Save the edited name when the "Edit" button is clicked again
          onEdit(task, editedName);
        }
        setIsEditing(!isEditing);
      };
    
      const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedName(event.target.value);
      };
    

      return (
        <div className="TaskItem">
          <input
            type="checkbox"
            id={task.name}
            name="completedCheckbox"
            checked={isChecked}
            onChange={handleOnChange}
          />
          {isEditing ? (
            <input
              type="text"
              value={editedName}
              onChange={handleNameChange}
            />
          ) : (
            <span>{task.name}</span>
          )}
          <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
          <button onClick={handleRemove}>Remove</button>
        </div>
      );
}

export default TaskItem
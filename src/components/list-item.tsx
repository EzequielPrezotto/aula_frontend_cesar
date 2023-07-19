import { useState } from "react";

import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { EditableTextInput } from "./editable-text-input";

import type { TodoItemEditType, TodoItem } from "../types/todo-item";

interface Props {
  item: TodoItem;
  onEdit: (id: number, newValues: TodoItemEditType) => void;
  onDelete: (id: number) => void;
}

export function ListItem({ item, onEdit, onDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(item.content);

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
    setNewContent(item.content);
  };

  const handleSave = () => {
    if (newContent.trim().length === 0) {
      return;
    }

    setIsEditing(false);
    onEdit(item.id, { content: newContent });
  };

  const handleDelete = () => {
    setIsEditing(false);
    onDelete(item.id);
  };

  return (
    <li className="flex items-center gap-2 py-1">
      <Checkbox
        checked={item.completed}
        onChange={(value) => onEdit(item.id, { completed: value })}
      />

      <EditableTextInput
        value={newContent}
        onChange={setNewContent}
        isEditing={isEditing}
      />

      <Button
        className="ml-auto bg-red-600"
        onClick={isEditing ? handleCancelEditing : handleStartEditing}
      >
        {isEditing ? "Cancel" : "Edit"}
      </Button>

      <Button
        className={isEditing ? "bg-green-600" : "bg-red-600"}
        onClick={isEditing ? handleSave : handleDelete}
        disabled={isEditing && newContent.trim().length === 0}
      >
        {isEditing ? "Save" : "Delete"}
      </Button>
    </li>
  );
}

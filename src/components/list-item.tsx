import { useState } from "react";
import { RxCross2, RxPencil2, RxTrash, RxCheck } from "react-icons/rx";

import { Button } from "@/components/button";
import { Checkbox } from "@/components/checkbox";
import { EditableTextInput } from "@/components/editable-text-input";
import { classnames } from "@/utils/classnames";

import type { TodoItemEditType, TodoItem } from "@/types/todo-item";

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
    if (newContent.trim() === "") {
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
    <li>
      <form className="flex items-center gap-2 py-1">
        <Checkbox
          checked={item.completed}
          onChange={(value) => onEdit(item.id, { completed: value })}
        />

        <EditableTextInput
          value={newContent}
          onChange={setNewContent}
          isEditing={isEditing}
          completed={item.completed}
        />

        {isEditing ? (
          <>
            <Button
              type="button"
              title="Cancel editing"
              className={classnames("ml-auto bg-red-600")}
              onClick={handleCancelEditing}
            >
              <RxCross2 />
            </Button>

            <Button
              type="submit"
              title="Save"
              className={classnames("bg-green-600")}
              onClick={(event) => {
                event.preventDefault();
                handleSave();
              }}
              disabled={isEditing && newContent.trim() === ""}
            >
              <RxCheck />
            </Button>
          </>
        ) : (
          <>
            <Button
              type="button"
              title="Start editing"
              className={classnames("ml-auto bg-indigo-600")}
              onClick={handleStartEditing}
            >
              <RxPencil2 />
            </Button>

            <Button
              type="button"
              title="Delete"
              className={classnames("bg-red-600")}
              onClick={handleDelete}
            >
              <RxTrash />
            </Button>
          </>
        )}
      </form>
    </li>
  );
}

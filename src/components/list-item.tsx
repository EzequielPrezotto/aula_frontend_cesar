import { type TodoItem } from "../types/todo-item";

import { Button } from "./button";
import { Checkbox } from "./checkbox";

interface Props {
  item: TodoItem;
  handleCompletedChange: (id: number, value: boolean) => void;
  handleDelete: (id: number) => void;
}

export function ListItem({ item, handleCompletedChange, handleDelete }: Props) {
  return (
    <li className="flex items-center gap-2 py-1">
      <Checkbox
        checked={item.completed}
        onChange={(value) => handleCompletedChange(item.id, value)}
      />

      {item.content}

      <Button
        className="ml-auto bg-red-600"
        onClick={() => handleDelete(item.id)}
      >
        Delete
      </Button>
    </li>
  );
}

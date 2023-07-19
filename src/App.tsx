import { useState } from "react";

import { Button } from "./components/button";
import { ListItem } from "./components/list-item";
import { TextInput } from "./components/text-input";
import { loadListData, saveListData } from "./storage/list-data";

import type { TodoItemEditType, TodoItem } from "./types/todo-item";

export function App() {
  const [data, setData] = useState<TodoItem[]>(() => loadListData());
  const [newContent, setNewContent] = useState("");

  const handleSubmit = () => {
    if (newContent.trim() === "") {
      return;
    }

    const id = Math.max(0, ...data.map((item) => item.id + 1));

    const newItem = {
      id,
      completed: false,
      content: newContent.trim(),
    };

    setData((oldData) => {
      const newData = [...oldData, newItem];

      saveListData(newData);
      return newData;
    });

    setNewContent("");
  };

  const handleDelete = (id: number) => {
    setData((oldData) => {
      const newData = oldData.filter((item) => item.id != id);

      saveListData(newData);
      return newData;
    });
  };

  const handleEdit = (id: number, newValues: TodoItemEditType) => {
    setData((oldData) => {
      const newData = oldData.map((item) =>
        item.id === id ? { ...item, ...newValues } : item,
      );

      saveListData(newData);
      return newData;
    });
  };

  const incompleteTasks = data
    .filter((item) => !item.completed)
    .map((item) => (
      <ListItem
        key={item.id}
        item={item}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    ));

  const completedTasks = data
    .filter((item) => item.completed)
    .map((item) => (
      <ListItem
        key={item.id}
        item={item}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    ));

  return (
    <main className="container mx-auto flex w-[700px] flex-col gap-2">
      <section className="flex flex-col gap-4">
        <h3 className="border-b border-gray-700">Add task</h3>

        <div className="flex gap-2">
          <TextInput
            placeholder="New note"
            value={newContent}
            onChange={setNewContent}
          />

          <Button
            className="bg-blue-800"
            disabled={newContent.trim().length === 0}
            onClick={handleSubmit}
          >
            Add
          </Button>
        </div>
      </section>

      <section className="flex flex-col">
        <h3 className="border-b border-gray-700">Tasks</h3>

        <ul className="divide-y divide-gray-700 px-5">{incompleteTasks}</ul>
      </section>

      <section className="flex flex-col">
        <h3 className="border-b border-gray-700">Completed</h3>

        <ul className="divide-y divide-gray-700 px-5">{completedTasks}</ul>
      </section>
    </main>
  );
}

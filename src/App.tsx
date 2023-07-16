import { useState } from "react";

import { Button } from "./components/button";
import { ListItem } from "./components/list-item";
import { TextInput } from "./components/text-input";
import { getListData, setListData } from "./storage/list-data";
import { type TodoItem } from "./types/todo-item";

export function App() {
  const [data, setData] = useState<TodoItem[]>(() => getListData());
  const [newContent, setNewContent] = useState("");

  const handleSubmit = () => {
    if (newContent === "") {
      return;
    }

    const id = Math.max(0, ...data.map((item) => item.id + 1));

    const newItem = {
      id,
      completed: false,
      content: newContent,
    };

    setData((oldData) => {
      const newData = [...oldData, newItem];

      setListData(newData);
      return newData;
    });

    setNewContent("");
  };

  const handleDelete = (id: number) => {
    setData((oldData) => oldData.filter((item) => item.id != id));
  };

  const handleCompletedChange = (id: number, completed: boolean) => {
    setData((oldData) => {
      const newData = oldData.map((item) =>
        item.id === id ? { ...item, completed } : item,
      );

      setListData(newData);
      return newData;
    });
  };

  const incompleteTasks = data
    .filter((item) => !item.completed)
    .map((item) => (
      <ListItem
        key={item.id}
        item={item}
        handleCompletedChange={handleCompletedChange}
        handleDelete={handleDelete}
      />
    ));

  const completedTasks = data
    .filter((item) => item.completed)
    .map((item) => (
      <ListItem
        key={item.id}
        item={item}
        handleCompletedChange={handleCompletedChange}
        handleDelete={handleDelete}
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

          <Button className="bg-blue-800" onClick={handleSubmit}>
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

import "normalize.css/normalize.css";
import "./style.css";

import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";

import { getListData, setListData, type ListItem } from "./list-item";
import { getLocalStorageItem } from "./local-storage";

export function App() {
  const [data, setData] = useState<ListItem[]>(getListData("react"));
  const [newContent, setNewContent] = useState("");

  const handleSubmit = () => {
    if (newContent === "") {
      return;
    }

    const id = Math.max(0, ...data.map((item) => item.id + 1));

    const newItem = {
      id: id,
      completed: false,
      content: newContent,
    };

    setData((oldData) => {
      const newData = [...oldData, newItem];

      setListData("react", newData);

      return newData;
    });

    setNewContent("");
  };

  const handleDelete = (id: number) => {
    setData((oldData) => oldData.filter((item) => item.id != id));
  };

  const handleCompletedChange = (id: number, completed: boolean) => {
    setData((oldData) =>
      oldData.map((item) => (item.id === id ? { ...item, completed } : item))
    );
  };

  return (
    <main className="container">
      <section className="section-container">
        <h3 className="title">Add task (React)</h3>

        <div className="add-task-container">
          <input
            type="text"
            value={newContent}
            onChange={(event) => setNewContent(event.currentTarget.value)}
          />

          <button className="btn btn-add" onClick={handleSubmit}>
            Add
          </button>
        </div>
      </section>

      <section className="section-container">
        <h3 className="title">Tasks</h3>

        <ul className="list-container">
          {data
            .filter((item) => !item.completed)
            .map((item) => (
              <li key={item.id} className="list-item">
                <input
                  type="checkbox"
                  onChange={() => handleCompletedChange(item.id, true)}
                />

                {item.content}

                <button
                  className="btn btn-delete"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </li>
            ))}
        </ul>
      </section>

      <section className="section-container">
        <h3 className="title">Completed</h3>

        <ul className="list-container">
          {data
            .filter((item) => item.completed)
            .map((item) => (
              <li key={item.id} className="list-item">
                <input
                  type="checkbox"
                  checked
                  onChange={() => handleCompletedChange(item.id, false)}
                />

                {item.content}

                <button
                  className="btn btn-delete"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </li>
            ))}
        </ul>
      </section>
    </main>
  );
}

createRoot(document.getElementById("react-root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

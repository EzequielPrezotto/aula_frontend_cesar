import "normalize.css/normalize.css";
import "./style.css";

import { type ListItem } from "./list-item";

const submitElement =
  document.querySelector<HTMLButtonElement>("#submit-button");
const inputElement = document.querySelector<HTMLInputElement>("#new-task");
const todoListElement = document.querySelector<HTMLUListElement>("#todo-list");
const completedListElement =
  document.querySelector<HTMLUListElement>("#completed-list");

if (
  submitElement == null ||
  inputElement == null ||
  todoListElement == null ||
  completedListElement == null
) {
  throw "Element not found";
}

let data: ListItem[] = [];

const addItem = (content: string) => {
  const id = Math.max(0, ...data.map((item) => item.id + 1));

  const newItem = {
    id: id,
    completed: false,
    content,
  };

  data.push(newItem);
};

const handleSubmit = () => {
  if (inputElement.value === "") {
    return;
  }

  addItem(inputElement.value);

  updateDOM({
    values: data,
    todoRoot: todoListElement,
    completedRoot: completedListElement,
  });

  inputElement.value = "";
};

const handleDelete = (id: number) => {
  data = data.filter((item) => item.id != id);

  updateDOM({
    values: data,
    todoRoot: todoListElement,
    completedRoot: completedListElement,
  });
};

const handleCompletedChange = (id: number, completed: boolean) => {
  data = data.map((item) => (item.id === id ? { ...item, completed } : item));

  updateDOM({
    values: data,
    todoRoot: todoListElement,
    completedRoot: completedListElement,
  });
};

const getItemNode = (item: ListItem): HTMLLIElement => {
  const node = document.createElement("li");
  node.classList.add("list-item");

  const checkboxNode = document.createElement("input");
  checkboxNode.setAttribute("type", "checkbox");
  checkboxNode.checked = item.completed;
  checkboxNode.addEventListener("click", (event) =>
    handleCompletedChange(item.id, (event.target as HTMLInputElement).checked)
  );

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("btn", "btn-delete");
  deleteButton.append("Delete");
  deleteButton.addEventListener("click", () => handleDelete(item.id));

  node.append(checkboxNode, item.content, deleteButton);

  return node;
};

const updateDOM = ({
  values,
  todoRoot,
  completedRoot,
}: {
  values: ListItem[];
  todoRoot: HTMLUListElement;
  completedRoot: HTMLUListElement;
}) => {
  const todoLiElements = values
    .filter((item) => !item.completed)
    .map((item) => {
      return getItemNode(item);
    });

  const completedLiElements = values
    .filter((item) => item.completed)
    .map((item) => {
      return getItemNode(item);
    });

  todoRoot.replaceChildren(...todoLiElements);
  completedRoot.replaceChildren(...completedLiElements);
};

submitElement.addEventListener("click", handleSubmit);

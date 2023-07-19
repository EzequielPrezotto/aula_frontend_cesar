import { z } from "zod";

import { todoItemSchema } from "@/types/todo-item";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "@/utils/local-storage";

import type { TodoItem } from "@/types/todo-item";

export function loadListData(): TodoItem[] {
  const data = getLocalStorageItem("list-data");

  const result = z.array(todoItemSchema).safeParse(data);

  if (!result.success) {
    console.error(result.error.message);
    return [];
  }

  return result.data;
}

export function saveListData(data: TodoItem[]) {
  setLocalStorageItem("list-data", data);
}

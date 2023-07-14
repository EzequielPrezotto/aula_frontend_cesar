import { z } from "zod";

import { getLocalStorageItem, setLocalStorageItem } from "./local-storage";

const schema = z.object({
  id: z.number(),
  completed: z.boolean(),
  content: z.string().min(1),
});

export type ListItem = z.infer<typeof schema>;

export function getListData(namespace: "vanilla" | "react"): ListItem[] {
  const data = getLocalStorageItem(`list-data-${namespace}`);

  const result = z.array(schema).safeParse(data);

  if (!result.success) {
    return [];
  }

  return result.data;
}

export function setListData(namespace: "vanilla" | "react", data: ListItem[]) {
  setLocalStorageItem(`list-data-${namespace}`, data);
}

import { z } from "zod";

export const todoItemSchema = z.object({
  id: z.number(),
  completed: z.boolean(),
  content: z.string().trim().min(1),
});

export type TodoItem = z.infer<typeof todoItemSchema>;

export type TodoItemEditType = Partial<Omit<TodoItem, "id">>;

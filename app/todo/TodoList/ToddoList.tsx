"use client";

import { TodoResponse, TodoSearchParams, TodoType } from "@/types/todo.type";
import Todo from "../Todo/Todo";
import { Group, Paper, Stack } from "@mantine/core";
import { NEXT_PUBLIC_API_URL } from "@/libs/constants";
import TodoPagination from "../TodoPagination/TodoPagination";

interface TodoListProps {
  searchParams: TodoSearchParams;
}

const fetchTodos = async (
  searchParams: TodoSearchParams
): Promise<TodoResponse | undefined> => {
  try {
    // let queryParams =
    const res = await fetch(
      `${NEXT_PUBLIC_API_URL}/api/todo?${new URLSearchParams(searchParams)}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch todos");
    }

    return await res.json();
  } catch (error) {
    console.log("error", error);
  }
};

const TodoList = async ({ searchParams }: TodoListProps) => {
  const data = await fetchTodos(searchParams);
  const todos = data?.todos;

  return (
    <Paper withBorder shadow="md" p={"md"}>
      <Stack>
        {todos?.map((todo: TodoType) => (
          <Todo key={todo.id} todo={todo} />
        ))}
        <TodoPagination total={data?.totalPages} />
      </Stack>
    </Paper>
  );
};
export default TodoList;

"use client";

import { TodoResponse, TodoType } from "@/types/todo.type";
import Todo from "../todo-item/todo-item";
import { Paper, Stack } from "@mantine/core";
import TodoPagination from "../todo-pagination/todo-pagination";

interface Props {
  todoData: TodoResponse;
}

const TodoList = ({ todoData }: Props) => {
  return (
    <>
      <Paper withBorder shadow="md" p={"md"}>
        <Stack pos={"relative"}>
          {todoData?.todos?.map((todo: TodoType) => (
            <Todo key={todo.id} todo={todo} />
          ))}

          <TodoPagination total={todoData?.totalPages} />
        </Stack>
      </Paper>
    </>
  );
};
export default TodoList;

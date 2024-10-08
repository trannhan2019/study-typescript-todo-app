"use client";

import { TodoResponse, TodoType } from "@/types/todo.type";
import Todo from "../Todo/Todo";
import {
  Box,
  Group,
  Loader,
  LoadingOverlay,
  Paper,
  Stack,
} from "@mantine/core";
import TodoPagination from "../TodoPagination/TodoPagination";
import TodoAddForm from "../TodoAddForm/TodoAddForm";
import TodoSearch from "../TodoSearch/TodoSearch";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";

interface Props {
  todoData: TodoResponse;
}

const TodoList = ({ todoData }: Props) => {
  const [visible, handleVisible] = useDisclosure(false);
  useEffect(() => {
    if (todoData?.todos?.length === 0) {
      handleVisible.open();
    }
    handleVisible.close();
  }, [todoData?.todos?.length]);
  console.log(visible, "visible");

  return (
    <>
      <Group justify="space-between" mb={"md"}>
        <TodoAddForm visible={visible} handleVisible={handleVisible} />
        <TodoSearch />
      </Group>

      <Paper withBorder shadow="md" p={"md"}>
        <Stack pos={"relative"}>
          <LoadingOverlay
            visible={visible}
            loaderProps={{ children: <Loader type="bars" /> }}
          />
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

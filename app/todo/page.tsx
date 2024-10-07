import { Anchor, Container, Group, Paper, Title } from "@mantine/core";
import Link from "next/link";
import TodoAddForm from "./TodoAddForm/TodoAddForm";

import { TodoResponse, TodoSearchParams, TodoType } from "@/types/todo.type";
import TodoList from "./TodoList/ToddoList";
import { NEXT_PUBLIC_API_URL } from "@/libs/constants";
import TodoPagination from "./TodoPagination/TodoPagination";
import TodoSearch from "./TodoSearch/TodoSearch";

interface PageProps {
  searchParams: TodoSearchParams;
}

const fetchTodos = async (
  searchParams: PageProps["searchParams"]
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

const TodoPage = async ({ searchParams }: PageProps) => {
  const data = await fetchTodos(searchParams);
  // console.log("todos", data?.page, data?.totalPages, data?.todos);

  return (
    <Container p="md">
      <Paper withBorder shadow="md" p={"md"}>
        <Group justify="space-between">
          <Title mb={"md"} order={1}>
            Todo App
          </Title>
          <Anchor component={Link} href={"/"}>
            Go back Home
          </Anchor>
        </Group>
        <Group justify="space-between" mb={"md"}>
          <TodoAddForm />
          <TodoSearch />
        </Group>
        <TodoList todos={data?.todos as TodoType[]} />
        <TodoPagination total={data?.totalPages} />
      </Paper>
    </Container>
  );
};

export default TodoPage;

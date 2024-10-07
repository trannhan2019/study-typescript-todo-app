import { TodoType } from "@/types/todo.type";
import Todo from "../Todo/Todo";
import { Paper } from "@mantine/core";

interface TodoListProps {
  todos: TodoType[] | undefined;
}

const TodoList = ({ todos }: TodoListProps) => {
  return (
    <Paper withBorder shadow="md" p={"md"}>
      {todos?.map((todo: TodoType) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </Paper>
  );
};
export default TodoList;

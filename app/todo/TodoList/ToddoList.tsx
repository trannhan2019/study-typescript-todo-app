import { TodoType } from "@/types/todo.type";
import Todo from "../Todo/Todo";

interface TodoListProps {
  todos: TodoType[] | undefined;
}

const TodoList = ({ todos }: TodoListProps) => {
  return (
    <>
      {todos?.map((todo: TodoType) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </>
  );
};
export default TodoList;

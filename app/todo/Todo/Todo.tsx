import { TodoType } from "@/types/todo.type";
import {
  Button,
  ButtonGroup,
  Group,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { IconCancel, IconEdit } from "@tabler/icons-react";

interface TodoProps {
  todo: TodoType;
}

const Todo = ({ todo }: TodoProps) => {
  return (
    <>
      <Group justify="space-between">
        <UnstyledButton variant="subtle">
          <Text py={10} c={todo.isCompleted ? "green" : ""}>
            {todo.title}
          </Text>
        </UnstyledButton>

        <ButtonGroup>
          <Button variant="white">
            <IconEdit size={18} />
          </Button>
          <Button variant="white">
            <IconCancel size={18} color="red" />
          </Button>
        </ButtonGroup>
      </Group>
    </>
  );
};

export default Todo;

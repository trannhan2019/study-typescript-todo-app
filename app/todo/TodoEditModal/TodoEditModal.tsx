"use client";

import { TodoType } from "@/types/todo.type";
import { todoEditSchema } from "@/validation/todo";
import { Button, Card, Group, Modal, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { notifications } from "@mantine/notifications";
import { zodResolver } from "mantine-form-zod-resolver";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";

interface TodoEditModalProps {
  opened: boolean;
  close: () => void;
  todo: TodoType;
}

interface FormValues extends z.infer<typeof todoEditSchema> {
  isCompleted: boolean;
}
const TodoEditModal = ({ opened, close, todo }: TodoEditModalProps & {}) => {
  // console.log("todo tai modal edit", todo);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!opened) {
      form.reset();
    }
    form.setValues(todo);
  }, [opened]);

  const form = useForm({
    mode: "controlled",
    initialValues: {
      title: todo?.title,
      isCompleted: Boolean(todo?.isCompleted) || false,
    },
    validate: zodResolver(todoEditSchema),
  });

  // console.log(form.values);

  const onSubmit = async (values: typeof form.values) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/todo/${todo?.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        close();
        form.reset();
        setLoading(false);
        notifications.show({
          title: "Success",
          message: "Todo added successfully",
          color: "green",
        });
        router.refresh();
      } else {
        console.log("Error while Registeing", res);
        setLoading(false);
        notifications.show({
          title: "Error",
          message: "Error while Registeing",
          color: "red",
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      closeOnClickOutside={false}
      centered
      title="Edit Todo"
    >
      <Card>
        <form onSubmit={form.onSubmit(onSubmit)}>
          <Card.Section>
            <TextInput
              label="Edit Title"
              key={form.key("title")}
              {...form.getInputProps("title")}
              // value={todo?.title as string}
            />
            <Switch
              label="Completed"
              key={form.key("isCompleted")}
              // checked={Boolean(form.values?.isCompleted)}
              {...(form.getInputProps("isCompleted"),
              {
                type: "checkbox",
                checked: Boolean(form.values?.isCompleted),
                onChange: (e) => {
                  form.setFieldValue("isCompleted", e.currentTarget.checked);
                },
              })}
              mt={10}
            />
            {/* <p> show {form.values.isCompleted ? "true" : "false"}</p> */}
          </Card.Section>
          <Card.Section mt={"md"}>
            <Group justify="flex-end">
              <Button variant="outline" onClick={close}>
                Cancel
              </Button>
              <Button type="submit" loading={loading} variant="gradient">
                Save
              </Button>
            </Group>
          </Card.Section>
        </form>
      </Card>
    </Modal>
  );
};

export default TodoEditModal;

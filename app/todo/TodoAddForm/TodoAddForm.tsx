"use client";

import { useForm } from "@mantine/form";
import { z } from "zod";
import { zodResolver } from "mantine-form-zod-resolver";
import { Box, Button, FocusTrap, Group, TextInput } from "@mantine/core";
import { todoAddSchema } from "@/validation/todo";
import { useRouter } from "next/navigation";

export type FormValues = z.infer<typeof todoAddSchema>;
type Props = {
  visible: boolean;
  handleVisible: { open: () => void; close: () => void };
};

const TodoAddForm = ({ visible, handleVisible }: Props) => {
  const router = useRouter();

  const form = useForm<FormValues>({
    mode: "uncontrolled",
    initialValues: {
      title: "",
    },
    validate: zodResolver(todoAddSchema),
  });

  const onSubmit = async (values: FormValues): Promise<void> => {
    handleVisible.open();
    try {
      const res = await fetch("/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      form.reset();
      handleVisible.close();
      router.refresh();
    } catch (error) {
      console.log("Error while Registeing", error);
      handleVisible.close();
    }
  };

  return (
    <Box>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Group align="center">
          <FocusTrap>
            <TextInput
              placeholder="Add Todo"
              key={form.key("title")}
              {...form.getInputProps("title")}
            />
          </FocusTrap>
          <Button size="sm" loading={visible} type="submit">
            Add Todo
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default TodoAddForm;

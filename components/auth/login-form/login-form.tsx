"use client";

import {
  Anchor,
  Button,
  Checkbox,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import Link from "next/link";
import { signIn } from "@/auth";
import { useSearchParams } from "next/navigation";
import { useForm, zodResolver } from "@mantine/form";
import { authLoginSchema } from "@/schema/auth";
import { notifications } from "@mantine/notifications";
import { useTransition } from "react";
import { useRouter } from "next-nprogress-bar";
import { login } from "@/actions/auth";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
    },
    validate: zodResolver(authLoginSchema),
  });

  const onSubmit = async (values: typeof form.values) => {
    startTransition(() => {
      login(values)
        .then((res) => {
          if (res?.error) {
            notifications.show({
              color: "red",
              title: "Error",
              message: res.error,
              position: "top-right",
            });
          }
          if (res?.success) {
            notifications.show({
              color: "green",
              title: "Success",
              message: res.success,
              position: "top-right",
            });
            router.push("/");
            form.reset();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };
  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <TextInput
        label="User name"
        placeholder="Your Username"
        size="md"
        key={form.key("username")}
        {...form.getInputProps("username")}
      />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        mt="md"
        size="md"
        key={form.key("password")}
        {...form.getInputProps("password")}
      />
      <Checkbox label="Keep me logged in" mt="xl" size="md" />
      <Text c="dimmed" size="sm" mt={5}>
        Do you have an account yet?{" "}
        <Anchor href="/register" size="sm" component={Link}>
          Register account
        </Anchor>
      </Text>
      <Button type="submit" loading={isPending} fullWidth mt="xl" size="sm">
        Login
      </Button>
    </form>
  );
}

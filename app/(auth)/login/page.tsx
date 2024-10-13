import { Center, Paper, Title } from "@mantine/core";
import classes from "./style.module.css";
import LoginForm from "@/components/auth/login-form/login-form";

export default async function LoginPage() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.bgImage}></div>
      <div className={classes.form}>
        <Center h={"100%"} w={"100%"}>
          <Paper>
            <Title order={2} ta="center" mb={50}>
              Welcome back to Mantine!
            </Title>
            <LoginForm />
          </Paper>
        </Center>
      </div>
    </div>
  );
}

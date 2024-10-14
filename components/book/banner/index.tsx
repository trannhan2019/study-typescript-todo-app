import { Container, Title, Text, Button } from "@mantine/core";
import classes from "./style.module.css";

export function BookBanner() {
  return (
    <div className={classes.root}>
      <Container size="lg" h={"100%"}>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              BOOKS{" "}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: "pink", to: "yellow" }}
              >
                COLLECTION
              </Text>{" "}
            </Title>

            <Text className={classes.description} mt={30}>
              Build fully functional accessible web applications with ease –
              Mantine includes more than 100 customizable components and hooks
              to cover you in any situation
            </Text>

            <Button
              variant="gradient"
              gradient={{ from: "pink", to: "yellow" }}
              size="xl"
              className={classes.control}
              mt={40}
            >
              Get started
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

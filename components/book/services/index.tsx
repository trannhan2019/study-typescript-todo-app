import { Container, SimpleGrid, Card, Text, ThemeIcon } from "@mantine/core";
import {
  IconTruckDelivery,
  IconRefresh,
  IconCoin,
  IconLifebuoy,
} from "@tabler/icons-react";

function BookServices() {
  return (
    <Container>
      <SimpleGrid cols={4} spacing="lg">
        <Card shadow="sm" p="lg">
          <ThemeIcon color="blue" size="lg" radius="xl">
            <IconTruckDelivery size={24} />
          </ThemeIcon>
          <Text w={500} mt="md">
            Free Shipping Item
          </Text>
          <Text size="sm">Order over $500</Text>
        </Card>

        <Card shadow="sm" p="lg">
          <ThemeIcon color="green" size="lg" radius="xl">
            <IconRefresh size={24} />
          </ThemeIcon>
          <Text w={500} mt="md">
            Money Back Guarantee
          </Text>
          <Text size="sm">100% money back</Text>
        </Card>

        <Card shadow="sm" p="lg">
          <ThemeIcon color="orange" size="lg" radius="xl">
            <IconCoin size={24} />
          </ThemeIcon>
          <Text w={500} mt="md">
            Cash On Delivery
          </Text>
          <Text size="sm">Lorem ipsum dolor amet</Text>
        </Card>

        <Card shadow="sm" p="lg">
          <ThemeIcon color="red" size="lg" radius="xl">
            <IconLifebuoy size={24} />
          </ThemeIcon>
          <Text w={500} mt="md">
            Help & Support
          </Text>
          <Text size="sm">Call us: +0123,4567.89</Text>
        </Card>
      </SimpleGrid>
    </Container>
  );
}

export default BookServices;

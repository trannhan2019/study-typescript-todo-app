import { BookBanner } from "@/components/book/banner";
import BookServices from "@/components/book/services";
import { Stack } from "@mantine/core";

export default function BookPage() {
  return (
    <Stack>
      <BookBanner />
      <BookServices />
    </Stack>
  );
}

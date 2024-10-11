"use client";

import useUrlParams from "@/hooks/useUrlParams";
import { CloseButton, rem, TextInput } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const TodoSearch = () => {
  const router = useRouter();

  const pathname = usePathname();

  const params = useUrlParams();

  const [value, setValue] = useState("");

  const iconSearch = <IconSearch style={{ width: rem(16), height: rem(16) }} />;

  const handleSearch = useDebouncedCallback(() => {
    const newParams = new URLSearchParams({
      ...params,
      page: "1",
      search: value,
    });
    router.push(`${pathname}?${newParams.toString()}`);
  }, 400);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
    handleSearch();
  };

  return (
    <>
      <TextInput
        placeholder="Search..."
        size="sm"
        leftSection={iconSearch}
        rightSection={
          <CloseButton
            aria-label="Clear search"
            onClick={() => {
              setValue("");
              handleSearch();
            }}
            variant="transparent"
            size="sm"
            style={{ display: value ? undefined : "none" }}
          />
        }
        value={value}
        onChange={onChange}
        defaultValue={params?.search}
      />
    </>
  );
};

export default TodoSearch;

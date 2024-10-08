"use client";

import useUrlParams from "@/hooks/useUrlParams";
import { rem, TextInput } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const TodoSearch = () => {
  const router = useRouter();

  const pathname = usePathname();

  const params = useUrlParams();

  const [value, setValue] = useState("");

  const icon = <IconSearch style={{ width: rem(16), height: rem(16) }} />;

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
        rightSection={icon}
        value={value}
        onChange={onChange}
        defaultValue={params?.search}
      />
    </>
  );
};

export default TodoSearch;

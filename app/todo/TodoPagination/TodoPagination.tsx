"use client";

import useUrlParams from "@/hooks/useUrlParams";
import { Group, NativeSelect, Pagination } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  total: string | undefined;
}

const TodoPagination = ({ total }: Props) => {
  // page = parseInt(page as string);

  const router = useRouter();
  const pathname = usePathname();
  const params = useUrlParams();

  const onChange = (page: number) => {
    const newParams = new URLSearchParams({ ...params, page: page.toString() });
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const onSelectChange = (event: any) => {
    const newParams = new URLSearchParams({
      ...params,
      limit: event.currentTarget.value,
    });
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <Group mt={20} justify="end">
      <Pagination
        total={parseInt(total as string)}
        withEdges
        value={Number(params?.page || 1)}
        onChange={onChange}
      />
      <NativeSelect
        data={["5", "10"]}
        value={params?.limit || "5"}
        onChange={(event) => onSelectChange(event)}
        w={80}
      />
    </Group>
  );
};

export default TodoPagination;

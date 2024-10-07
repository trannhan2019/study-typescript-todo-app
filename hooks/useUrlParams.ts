import { useSearchParams } from "next/navigation";

export default function useUrlParams() {
  const searchParams = useSearchParams();
  let query: any = {};
  searchParams.forEach((value, key) => {
    query[key] = value;
  });

  return query;
}

import { Loader, LoadingOverlay } from "@mantine/core";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <LoadingOverlay
      visible
      loaderProps={{ children: <Loader type="dots" /> }}
    />
  );
}

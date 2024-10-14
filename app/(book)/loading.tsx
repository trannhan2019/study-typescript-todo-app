import classes from "./loading.module.css";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.

  return (
    <div className={classes.loader}>
      <div className={classes.loaderSpinner}></div>
    </div>
  );
}

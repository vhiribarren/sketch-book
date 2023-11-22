import { Loader, Center } from "@mantine/core";
import styles from "./loading.module.css";

export default function Loading() {
  return (
    <Center className={styles.spinWrapper}>
      <Loader color="blue" />
    </Center> 
  );
}
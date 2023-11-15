import { Spin } from 'antd';
import styles from "./loading.module.css";

export default function Loading() {
  return (
    <Spin size="large" tip="Loading..." wrapperClassName={styles.spinWrapper}>
      <div className={styles.spinContent} />
    </Spin>)
}
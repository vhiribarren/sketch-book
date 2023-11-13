import React from 'react';
import styles from './MainView.module.css'

type MainViewProps = { children: React.ReactNode };

export default function MainView({children}: MainViewProps) {
    return (
        <div className={styles.mainview}>{children}</div>
    );
}
import React from 'react';
import styles from './PageItem.module.css';


export const PageItem = ({ children, title, content }) => {

    return (
        <div className={styles.post}>
            <div className={styles.wrapTitle}>
                <h2 className={styles.title}>{title}</h2>
                <div>{children}</div>
            </div>
            <p className={styles.content}>
                {content}
            </p>
        </div>
    )
}


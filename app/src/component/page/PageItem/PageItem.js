import React from 'react';
import styles from './PageItem.module.css';
import PositionControlContainer, { PositionControlContainerWithLogin } from '../../../container/PositionControlContainer/PositionControlContainer';


export const PageItem = ({ children, title, content, postID }) => {

    return (
        <div className={styles.post}>
            <div className={styles.wrap}>
                <div className={styles.wrapTitle}>
                    <PositionControlContainer
                        itemID={postID}
                        itemName="post"
                    />
                    <h2 className={styles.title}>{title}</h2>
                    <div>{children}</div>
                </div>
                <p className={styles.content} dangerouslySetInnerHTML={{ __html: content }}></p>
            </div>
        </div>
    )
}


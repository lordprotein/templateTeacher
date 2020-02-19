import React from 'react';
import styles from './Content.module.css';


export const Page = ({ children }) => {
	return (
		<section className={styles.page}>
			{children}
		</section>
	);
}


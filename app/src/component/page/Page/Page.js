import React from 'react';
import styles from './Content.module.css';


export const Page = ({ children, titlePage }) => {
	return (
		<section className={styles.page}>
			<h2 className={styles.title}>{titlePage}</h2>
			{children}
		</section>
	);
}


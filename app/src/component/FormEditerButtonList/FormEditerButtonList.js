import React from 'react';
import styles from './FormEditerButtonList.module.css';
import FormEditerButtonContainer from '../../container/FormEditer/FormEditerButtonContainer';


export const FormEditerButtonList = () => {

	return (
		<div className={styles.panel}>
			<FormEditerButtonContainer
				btnName="bold"
				styleClass={styles.panel_bold}
			/>
			<FormEditerButtonContainer
				btnName="italic"
				styleClass={styles.panel_italic}
			/>
			<FormEditerButtonContainer
				btnName="link"
				styleClass={styles.panel_link}
			/>
			<FormEditerButtonContainer
				btnName="image"
				styleClass={styles.panel_img}
			/>
			<FormEditerButtonContainer
				btnName="document"
				styleClass={styles.panel_document}
			/>
			<FormEditerButtonContainer
				btnName="video"
				styleClass={styles.panel_video}
			/>
			<FormEditerButtonContainer
				btnName="audio"
				styleClass={styles.panel_audio}
			/>
		</div>
	);
}

FormEditerButtonList.propTypes = {

}
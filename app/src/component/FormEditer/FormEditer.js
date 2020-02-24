import React from 'react';
import PropTypes from 'prop-types';
import styles from './FormEditer.module.css';
import { FormDownloadFile } from '../formDownloadFile/FormDownloadFiles/FormDownloadFile';
import FormEditerButtonContainer from '../../container/FormEditer/FormEditerButtonContainer';


export const FormEditer = ({ postID, title, content, actions, toReset }) => {
	const { onChangeTitleInput, onChangeContentInput, handleSend } = actions;

	return (
		<div className={styles.editWrap}>
			<div className={styles.section}>
				<h2 className={styles.section_title}>Заголовок</h2>
				<input // title 
					type="text"
					placeholder="Введите заголовок"
					onChange={onChangeTitleInput}
					defaultValue={title}
					className={styles.titleInput}
					autoFocus={true}
					spellCheck={true}
					tabIndex="1"
				/>
			</div>
			<div className={styles.section}>
				<h2 className={styles.section_title}>Содержание</h2>

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
					<button className={styles.panel_img} />
					<button className={styles.panel_file} />
				</div>

				<textarea //content
					placeholder="Введите текст"
					onChange={onChangeContentInput}
					defaultValue="Lorem alert go together besides"
					// defaultValue={content}
					className={styles.contentInput}
					spellCheck={true}
					id="form_editer"
					tabIndex="2"
				/>
			</div>
			<div className={styles.btnWrap}>
				<button onClick={toReset} className={styles.btnFalse}>
					Отмена
            	</button>
				<button onClick={handleSend} className={styles.btnTrue}>
					Сохранить
				</button>
			</div>
			<FormDownloadFile postID={postID} />
		</div >
	);
}

FormEditer.propTypes = {
	title: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	actions: PropTypes.object.isRequired,
	toReset: PropTypes.func.isRequired,
}
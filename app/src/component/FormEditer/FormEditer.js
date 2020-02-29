import React from 'react';
import PropTypes from 'prop-types';
import styles from './FormEditer.module.css';
import { FormEditerButtonList } from '../FormEditerButtonList/FormEditerButtonList';


export const FormEditer = ({ title, content, actions, isEditMode, FileListContainer }) => {
	const { handleInputTitle, handleInputContent, onSave, toReset } = actions;

	return (
		<div className={styles.editWrap}>
			{FileListContainer}

			<div className={styles.section}>
				<h2 className={styles.section_title}>Заголовок</h2>
				<input // title 
					type="text"
					placeholder="Введите заголовок"
					onChange={handleInputTitle}
					defaultValue={title}
					className={styles.titleInput}
					autoFocus={true}
					spellCheck={true}
					tabIndex="1"
				/>
			</div>
			<div className={styles.section}>
				<h2 className={styles.section_title}>Содержание</h2>

				{isEditMode || <FormEditerButtonList />}

				<textarea //content
					placeholder="Введите текст"
					onChange={handleInputContent}
					defaultValue={content}
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
				<button onClick={onSave} className={styles.btnTrue}>
					Сохранить
				</button>
			</div>
		</div >
	);
}

FormEditer.propTypes = {
	title: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	actions: PropTypes.object.isRequired,
	// FileListContainer,
}
import React from 'react';
import PropTypes from 'prop-types';


export const FormEditer = ({ title, content, actions, toReset }) => {
	const { onChangeTitleInput, onChangeContentInput, handleSend } = actions;

	return (
		<div className="editer">
			<input // title 
				type="text"
				placeholder="title"
				onChange={onChangeTitleInput}
				defaultValue={title}
			/>

			<textarea //content
				placeholder="Type content"
				onChange={onChangeContentInput}
				defaultValue={content}
			>
			</textarea>

			<input //btn SEND
				type="submit"
				value="Ок"
				onClick={handleSend}
			/>

			<button onClick={toReset}>
				Отмена
            </button>
		</div>
	);
}

FormEditer.propTypes = {
	title: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	actions: PropTypes.object.isRequired,
	toReset: PropTypes.func.isRequired,
}
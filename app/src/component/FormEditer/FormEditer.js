import React from 'react';

export const FormEditer = ({ postData, actions, toReset }) => {
	const { onChangeTitleInput, onChangeContentInput, handleSend } = actions;
	const { title, content } = postData;

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


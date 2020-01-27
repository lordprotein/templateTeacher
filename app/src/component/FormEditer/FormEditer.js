import React from 'react';

export const FormEditer = ({ postData, actions, removeAllModes }) => {
	const { onTitleInput, onContentInput, handleSend } = actions;
	const { title, content } = postData;

	return (
		<div className="editer">
			<input // title 
				type="text"
				placeholder="title"
				onChange={onTitleInput}
				defaultValue={title}
			/>

			<textarea //content
				placeholder="Type content"
				onChange={onContentInput}
				defaultValue={content}
			>
			</textarea>

			<input //btn SEND
				type="submit"
				value="Ок"
				onClick={handleSend}
			/>

			<button onClick={removeAllModes}>
				Отмена
            </button>
		</div>
	);
}


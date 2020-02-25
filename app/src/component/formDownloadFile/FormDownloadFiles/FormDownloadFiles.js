import React from 'react';

export const FormDownloadFiles = ({ postID }) => {

    return (
        <form action={`http://localhost:3333/upload/${postID}`} method="post" encType="multipart/form-data">
            <label>Файл</label><br /><br />
            <input type="file" name="filedata" /><br /><br />
            <input type="submit" value="Send" />
        </form>
    );
}
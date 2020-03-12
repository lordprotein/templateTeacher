import { myCookieUser } from "./myCookie";


export default class dbService {
    constructor() {
        this.domain = 'http://localhost:3333';
    }

    async getResource(url = '') {
        const getData = await fetch(`${this.domain}${url}`);

        if (!getData.ok) {
            throw new Error('Error: data is dont get');
        }

        return await getData.json();
    }

    async methodDoResourse(url = '', data, method) {
        const ID_USER = myCookieUser.get();
        if (!ID_USER && !url === '/login') return console.log('Haven\'t cookie USER');

        data = { ...data, ID_USER, };
        console.log()
        const postData = await fetch(`${this.domain}${url}`, {
            method: method,
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!postData.ok) {
            throw new Error('Error: data is dont send');
        }

        return await postData.json();
    }

    getMenuList() {
        return this.getResource(`/menu`);
    }

    getMenuPositionList(pos) {
        return this.getResource(`/menu/position/${pos}`);
    }

    getMenuItem(id = '') {
        return this.getResource(`/menu/${id}`);
    }

    getContentList(id = '') {
        return this.getResource(`/menu/${id}/posts`);
    }

    loginAuthorization(data) {
        return this.methodDoResourse('/login', data, 'POST');
    }

    getFiles(postId, type = false) {
        let link = `/post/${postId}/files`;
        if (type) link += `/${type}`;

        return this.getResource(link);
    }

    addFile(url = '', data, xhrFunc) {


        return new Promise((resolve, reject) => {

            const ID_USER = myCookieUser.get();
            if (!ID_USER) return;

            const formData = new FormData();
            formData.append('filedata', data.file);
            formData.append('type', data.type);
            formData.append('ID_USER', ID_USER);

            let xhr = new XMLHttpRequest();

            xhr.upload.onprogress = event => {
                const progress = Math.round((100 * +event.loaded) / +event.total);

                const breakDownload = () => {
                    xhr.abort();
                }

                xhrFunc(progress, breakDownload);
            }

            xhr.onloadend = () => {
                if (xhr.status !== 200) {
                    return reject(xhr.status);
                }

                return resolve(xhr.response);
            }

            xhr.open('POST', `${this.domain}${url}`);
            xhr.send(formData);
        });
    }

    downloadFile = (postID, type, data, xhrFunc) => {
        return this.addFile(`/upload/${type}/${postID}`, data, xhrFunc);
    }

    removeFile = data => {
        return this.methodDoResourse('/remove/file', data, 'DELETE');
    }



    addPost(data) {
        return this.methodDoResourse('/post', data, 'POST');
    }
    editPost(data) {
        return this.methodDoResourse('/post', data, 'PUT');
    }
    sequencePost(data) {
        return this.methodDoResourse('/post/sequence', data, 'PUT');
    }

    deletePost(data) {
        return this.methodDoResourse('/post', data, 'DELETE');
    }


    addMenu(data) {
        return this.methodDoResourse('/menu', data, 'POST');
    }
    editMenu(data) {
        return this.methodDoResourse('/menu', data, 'PUT');
    }
    sequenceMenu(data) {
        return this.methodDoResourse('/menu/sequence', data, 'PUT');
    }
    deleteMenu(data) {
        return this.methodDoResourse(`/menu`, data, 'DELETE');
    }




    updatePostList = (id, callback) => {
        this.getContentList(id)
            .then(contentList => {
                callback(contentList);
            });
    }

    updateMenuList = (position, callback) => {
        this.getMenuPositionList(position)
            .then(async () => {
                const res = await this.generateMenuList()
                callback(res);
            });
    }

}
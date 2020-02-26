// import generateMenuList from '../generateMenuList/generateMenuList';

export default class dbService {
    constructor() {
        this._link = 'http://localhost:3333';
        // this._link = 'http://77.222.63.195:3333';
    }

    async getResource(url = '') {
        const getData = await fetch(`${this._link}${url}`);

        if (!getData.ok) {
            throw new Error('Error: data is dont get');
        }

        return await getData.json();
    }

    async methodDoResourse(url = '', data, method) {
        const postData = await fetch(`${this._link}${url}`, {
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
        return this.getResource(`/menu/${id}/content`);
    }

    checkLogin(data) {
        return this.methodDoResourse('/login', data, 'POST');
    }

    getFiles(postId, type = false) {
        let link = `/post/${postId}/files`;
        if (type) link += `/${type}`;

        return this.getResource(link);
    }

    async addFile(url = '', data) {

        const formData = new FormData();
        formData.append('filedata', data);


        const response = await fetch(`${this._link}${url}`, {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            throw new Error('Error: file is not send');
        }

        return await response.json();
    }

    downloadImg = (postID, data) => {
        return this.addFile(`/upload/image/${postID}`, data);
    }



    addPost(data) {
        return this.methodDoResourse('/post-add', data, 'POST');
    }
    editPost(data) {
        return this.methodDoResourse('/post-edit', data, 'POST');
    }
    deletePost(data) {
        return this.methodDoResourse('/post-delete', data, 'POST');
    }


    addMenu(data) {
        return this.methodDoResourse('/menu-add', data, 'POST');
    }
    editMenu(data) {
        return this.methodDoResourse('/menu-edit', data, 'POST');
    }
    deleteMenu(data) {
        return this.methodDoResourse('/menu-delete', data, 'POST');
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
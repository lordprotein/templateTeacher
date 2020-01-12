export default class dbService {
    constructor() {
        this._link = 'http://77.222.63.195:3333';
    }

    async getResource(url = '') {
        const getData = await fetch(`${this._link}${url}`);

        if (!getData.ok) {
            throw new Error('Error: data is dont get');
        }

        return await getData.json();
    }

    async postResourse(url = '', data) {
        const postData = await fetch(`${this._link}${url}`, {
            method: 'POST',
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
        return this.postResourse('/login', data);
    }

    addPost(data) {
        return this.postResourse('/post-add', data);
    }

    deletePost(data) {
        return this.postResourse('/post-delete', data);
    }

}
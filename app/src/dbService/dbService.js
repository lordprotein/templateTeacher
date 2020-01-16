// import generateMenuList from '../generateMenuList/generateMenuList';
import toNormalizeLink from '../normalizeLink/normalizeLink';

export default class dbService {
    constructor() {
        // this._link = 'http://localhost:3333';
        this._link = 'http://77.222.63.195:3333';
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

    async generateMenuList() {
        let menuList = await this.getMenuList()
            .then(res => res);

        menuList = menuList.map(async ({ ID, title, position }) => {
            const postList = await this.getContentList(ID);
            return {
                ID,
                title,
                link: `/${toNormalizeLink(title)}`,
                position,
                postList
            }
        })

        return await Promise.all(menuList);
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
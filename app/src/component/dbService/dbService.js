export default class dbService {
    constructor() {
        this._link = 'http://77.222.63.195:3333';
    }

    async getResource(url = '') {
        const res = await fetch(`${this._link}${url}`);

        if (!res.ok) {
            throw new Error('Errorrrrr');
        }

        return await res.json();
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

    getContent(id = '') {
        return this.getResource(`/menu/${id}/content`);
    }


}
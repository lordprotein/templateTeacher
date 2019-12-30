import React, { Component } from 'react';
import MenuItem from '../menuItem/MenuItem';
import dbService from '../dbService/dbService';


export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuList: [],
        }
    }

    componentDidMount() {
        const { position } = this.props;
        const service = new dbService();
        service.getMenuPositionList(position)
            .then(result => {
                this.setState(() => { return { menuList: result } })
            });
    }

    render() {
        const { menuList } = this.state;
        const { position } = this.props;

        let stylePos = 'menu ';
        if (position === 'top') stylePos += 'menu--line';

        return (
            <nav className={stylePos}>
                {
                    renderElems(menuList)
                }
            </nav>
        );
    }

}

const renderElems = (elems) => {
    console.log(elems);
    return elems.map((item, key) => {
        return (
            <MenuItem
                title={item.title}
                link='#'
                key={key}
            />
        )
    });
}

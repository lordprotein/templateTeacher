import React, { Component } from 'react';
import MenuItem from '../menuItem/MenuItem';
import dbService from '../dbService/dbService';
import toNormalizeLink from '../normalizeLink/normalizeLink';


export default class Menu extends Component {
    state = {
        menuList: [],
    }

    componentDidMount = () => {
        const { position } = this.props;
        const service = new dbService();

        service.getMenuPositionList(position)
            .then(result => {
                this.setState(() => {
                    return { menuList: result }
                })
            });
    }

    renderElems = (menuList = []) => {
        return menuList.map((item, key) => {
            const link = toNormalizeLink(item.title);
            
            return (
                <MenuItem
                    title={item.title}
                    link={link}
                    key={key}
                />
            )
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
                    this.renderElems(menuList)
                }
            </nav>
        );
    }

}





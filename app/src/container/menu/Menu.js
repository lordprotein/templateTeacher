import React, { Component } from 'react';
import MenuItem from '../../component/menuItem/MenuItem';
import { connect } from 'react-redux';
import { selectors } from '../../redux/reducer';



class Menu extends Component {

    renderMenuList = (menuList = []) => {
        return menuList.map(({title, link}, key) => {
            return (
                <MenuItem
                    title={title}
                    link={link}
                    key={key}
                />
            )
        });
    }

    render() {
        const { position, menuList } = this.props;
        const menuPosList = menuList.filter(menuItem => position === menuItem.position);
        
        let stylePos = 'menu ';
        if (position === 'top') stylePos += 'menu--line';

        return (
            <nav className={stylePos}>
                {
                    this.renderMenuList(menuPosList)
                }
            </nav>
        );
    }

}

const mapStateToProps = state => {
    return { menuList: selectors.menuList(state) };
}

export default connect(mapStateToProps)(Menu);




import React, { Component } from 'react';
import MenuItem from '../../component/menuItem/MenuItem';
import { connect } from 'react-redux';
import { selectors } from '../../redux/reducer';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions';



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
        const { position, menuList, statusAuthoriz } = this.props;
        const menuPosList = menuList.filter(menuItem => position === menuItem.position);
        
        let stylePos = 'menu ';
        if (position === 'top') stylePos += 'menu--line';

        return (
            <nav className={stylePos}>
                
                {statusAuthoriz && <button>Добавить новое меню</button>}
                {
                    this.renderMenuList(menuPosList)
                }
            </nav>
        );
    }

}

const mapStateToProps = state => {
    return { 
        menuList: selectors.menuList(state),
        statusAuthoriz: selectors.statusAuthoriz(state),
     };
}

export default connect(mapStateToProps)(Menu);




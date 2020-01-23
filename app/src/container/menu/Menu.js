import React, { Component } from 'react';
import MenuItem from '../menuItem/MenuItem';
import { connect } from 'react-redux';
import { selectors } from '../../redux/reducer';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions';
import dbService from '../../dbService/dbService';


class Menu extends Component {

    getSubmenuList = (menuItem, menuList) => {
        const submenu_list = menuList.filter(item => menuItem.ID === item.submenu);


        if (!submenu_list.length) return false; //Check have submenu list

        let list_menu_items = [];

        for (let i = 0, max = submenu_list.length; i < max; i++) { //go to all menu items in this lvl
            const menu_elem = submenu_list[i];
            const menu_item = (
                <MenuItem
                    menuItem={menu_elem}
                    removeAllModes={this.removeAllModes}
                    addSub={(e, title, submenu) => this.addMenuItem(e, title, submenu)}
                    key={i} //Probably wrong
                >
                    {this.getSubmenuList(menu_elem, menuList)}
                </MenuItem>
            ); //If in menu item have submenu or submenu list - use recursion and go to are one level below
            list_menu_items = [...list_menu_items, menu_item];
        }
        return list_menu_items;
    }





    removeAllModes = () => {
        this.props.a_removeAllModes();
    }

    clickAddMenu = () => {
        const { a_toToggleAddMenu, position } = this.props;
        this.typeMenu = position;

        a_toToggleAddMenu(true);
    }

    addMenuItem = (e, title, submenu = false) => {
        e.preventDefault();

        if (!title) title = this.title;

        const { a_toToggleAddMenu, a_updateMenu, loginData, position } = this.props;

        const data = { ...loginData, title, position, submenu }
        const db = new dbService();

        db.addMenu(data)
            .then(res => {
                db.updateMenuList(position, menuList => {
                    a_updateMenu(menuList);
                    a_toToggleAddMenu(false);
                })
            })
    }

    onSaveTitle = e => {
        return this.title = e.target.value;
    }

    getAddingPanel = () => {
        const { statusAuthoriz, statusEdit, position } = this.props;

        if (!statusAuthoriz) return false;


        if (statusEdit && (this.typeMenu === position)) {
            delete this.typeMenu;

            return (
                <>
                    <button onClick={this.clickAddMenu}>Отмена</button>
                    <input
                        type="Submit"
                        defaultValue="Добавить"
                        onClick={e => this.addMenuItem(e)}
                    />
                    <input
                        type="text"
                        onChange={this.onSaveTitle}
                    />
                </>
            );
        }
        else {
            delete this.typeMenu;

            return (
                <button onClick={this.clickAddMenu}>
                    Добавить новое меню
                </button>
            );
        }

    }

    renderMenuList = (menuList) => {
        return menuList.map((menuItem, key) => {

            if (menuItem.submenu) return false;

            const submenu_items = this.getSubmenuList(menuItem, menuList);

            return (
                <MenuItem
                    menuItem={menuItem}
                    removeAllModes={this.removeAllModes}
                    addSub={(e, title, submenu) => this.addMenuItem(e, title, submenu)}
                    key={key}
                >
                    {submenu_items.length && submenu_items}
                </MenuItem>
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
                {this.getAddingPanel()}
                {this.renderMenuList(menuPosList)}
            </nav>
        );
    }

}

const mapStateToProps = state => {
    return {
        menuList: selectors.menuList(state),
        statusAuthoriz: selectors.statusAuthoriz(state),
        loginData: selectors.loginData(state),
        statusEdit: selectors.s_toggleAddMenu(state),
    };
}

const mapDispatchToProps = dispatch => {
    const { a_toToggleAddMenu, a_updateMenu, a_removeAllModes } = bindActionCreators(actions, dispatch);

    return {
        a_toToggleAddMenu,
        a_updateMenu,
        a_removeAllModes
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

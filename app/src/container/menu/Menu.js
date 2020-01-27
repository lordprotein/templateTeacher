import React, { Component } from 'react';
import MenuItem from '../menuItem/MenuItem';
import { connect } from 'react-redux';
import { selectors } from '../../redux/reducer';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions';
import dbService from '../../service/service';


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
                    addSubmenuItem={(title, submenu) => this.addMenuItem(title, submenu)}
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

    addMenuItem = (title, submenu = false) => { //add new menu elem
        const { a_toToggleAddMenu, a_updateMenu, loginData, position } = this.props;

        const data = { ...loginData, title, position, submenu }
        const db = new dbService();

        console.log(data)

        db.addMenu(data)
            .then(res => {
                db.updateMenuList(position, menuList => {
                    a_updateMenu(menuList);
                    a_toToggleAddMenu(false);
                })
            })
    }

    handleSaveInput = e => {
        return this.input_text = e.target.value;
    }

    getAddingPanel = () => {
        const { statusAuthoriz, statusEdit, position } = this.props;

        if (!statusAuthoriz) return false;


        if (statusEdit && (this.typeMenu === position)) {
            delete this.typeMenu;

            return (
                <>
                    <button onClick={this.clickAddMenu}>Отмена</button>
                    <button
                        onClick={() => this.addMenuItem(this.input_text)}
                    >
                        Добавить
                    </button>
                    <input
                        type="text"
                        onChange={this.handleSaveInput}
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
                    addSubmenuItem={(title, submenu) => this.addMenuItem(title, submenu)}
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

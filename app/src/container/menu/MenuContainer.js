import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MenuItemContainer from './MenuItemContainer';
import { selectors } from '../../redux/reducer';
import * as actions from '../../redux/actions';
import dbService from '../../service/service';
import { Menu } from '../../component/menu/Menu/Menu';


class MenuContainer extends Component {

    getSubmenuList = (menuItem, menuList) => {
        const submenu_list = menuList.filter(item => menuItem.ID === item.submenu);


        if (!submenu_list.length) return false; //Check have submenu list

        let list_menu_items = [];

        for (let i = 0, max = submenu_list.length; i < max; i++) { //go to all menu items in this lvl
            const menu_elem = submenu_list[i];
            const menu_item = (
                <MenuItemContainer
                    menuItem={menu_elem}
                    removeAllModes={this.removeAllModes}
                    addSubmenuItem={(title, submenu) => this.onAaddMenuItem(title, submenu)}
                    key={i} //Probably wrong
                >
                    {this.getSubmenuList(menu_elem, menuList)}
                </MenuItemContainer>
            ); //If in menu item have submenu or submenu list - use recursion and go to are one level below
            list_menu_items = [...list_menu_items, menu_item];
        }
        return list_menu_items;
    }

    removeAllModes = () => {
        this.props.a_removeAllModes();
    }

    onAddMenu = () => {
        const { a_toToggleAddMenu, position } = this.props;
        this.typeMenu = position;

        a_toToggleAddMenu(true);
    }

    onAddMenuItem = (title, submenu = false) => { //add new menu elem
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

    onChangeInput = e => {
        return this.input_text = e.target.value;
    }

    getPanelForAdd = () => {
        const { a_removeAllModes, statusAuthoriz, statusEdit, position } = this.props;

        if (!statusAuthoriz) return false;


        if (statusEdit && (this.typeMenu === position)) {
            delete this.typeMenu;

            return (
                <>
                    <button onClick={a_removeAllModes}>Отмена</button>
                    <button
                        onClick={() => this.onAddMenuItem(this.input_text)}
                    >
                        Добавить
                    </button>
                    <input
                        type="text"
                        onChange={this.onChangeInput}
                    />
                </>
            );
        }
        else {
            delete this.typeMenu;

            return (
                <button onClick={this.onAddMenu}>
                    Добавить новое меню
                </button>
            );
        }

    }

    renderMenuList = () => {
        let { position, menuList } = this.props;
        menuList = menuList.filter(menuItem => position === menuItem.position);

        return menuList.map((menuItem, key) => {

            if (menuItem.submenu) return false;

            const submenu_items = this.getSubmenuList(menuItem, menuList);

            return (
                <MenuItemContainer
                    menuItem={menuItem}
                    removeAllModes={this.removeAllModes}
                    addSubmenuItem={(title, submenu) => this.onAddMenuItem(title, submenu)}
                    key={key}
                >
                    {submenu_items.length && submenu_items}
                </MenuItemContainer>
            )
        });
    }

    render() {
        const { position } = this.props;

        return (
            <Menu
                addingPanel={this.getPanelForAdd()}
                menuList={this.renderMenuList()}
                stylePos={position === 'top' ? 'menu menu--line': 'menu'}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);

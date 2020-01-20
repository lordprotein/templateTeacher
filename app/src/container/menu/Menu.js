import React, { Component } from 'react';
import MenuItem from '../menuItem/MenuItem';
import { connect } from 'react-redux';
import { selectors } from '../../redux/reducer';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions';
import dbService from '../../dbService/dbService';

import SubMenu from '../subMenu/SubMenu';



class Menu extends Component {

    getSubMenu = (menuItem, menuList) => {
        const subMenuList = menuList.filter(item => menuItem.ID === item.submenu);

        if (!subMenuList.length) return '';

        let inFor = [];

        for (let i = 0, max = subMenuList.length; i < max; i++) {
            const menuElem = subMenuList[i];
            const li = (
                <MenuItem
                    menuItem={menuElem}>
                    {this.getSubMenu(menuElem, menuList)}
                </MenuItem>
            );
            inFor = [...inFor, li];
        }
        return inFor;
    }



    renderMenuList = (menuList) => {
        return menuList.map((menuItem, key) => {

            if (menuItem.submenu) return false;

            let out = this.getSubMenu(menuItem, menuList);
            console.log(out);

            return (
                <MenuItem
                    menuItem={menuItem}
                    removeAllModes={this.removeAllModes}
                    key={key}
                >
                    {out}
                </MenuItem>
            )
        });
    }

    removeAllModes = () => {
        this.props.a_removeAllModes();
    }

    clickAddMenu = () => {
        const { a_toToggleAddMenu, position } = this.props;
        this.typeMenu = position;

        a_toToggleAddMenu(true);
    }

    onSubmit = e => {
        e.preventDefault();
        const { title } = this;
        const { a_toToggleAddMenu, a_updateMenu, loginData, position } = this.props;

        const data = { position, title, ...loginData }
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

    modeEdit = () => {
        const { statusAuthoriz, statusEdit, position } = this.props;
        if (!statusAuthoriz) return;


        if (statusEdit && (this.typeMenu === position)) {
            delete this.typeMenu;

            return (
                <>
                    <button onClick={this.clickAddMenu}>
                        Отмена
                    </button>
                    <input type="Submit" defaultValue="Добавить" onClick={this.onSubmit} />
                    <input type="text" onChange={this.onSaveTitle} />
                </>
            );
        }
        else {
            delete this.typeMenu;

            return (
                <button onClick={() => this.clickAddMenu()}>
                    Добавить новое меню
                </button>
            );
        }

    }

    render() {
        const { position, menuList } = this.props;

        const menuPosList = menuList.filter(menuItem => position === menuItem.position);

        let stylePos = 'menu ';
        if (position === 'top') stylePos += 'menu--line';

        return (
            <nav className={stylePos}>

                {
                    this.modeEdit()
                    // statusAuthoriz && <button onClick={this.clickAddMenu}>Добавить новое меню</button>
                }
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

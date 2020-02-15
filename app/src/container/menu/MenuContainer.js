import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MenuItemContainer from './MenuItemContainer';
import { selectors } from '../../redux/reducer';
import * as actions from '../../redux/actions';
import dbService from '../../service/service';
import { Menu } from '../../component/menu/Menu/Menu';
import { ButtonWithLogIn } from '../../component/button/Button/Button';
import cyrillicToTranslit from 'cyrillic-to-translit-js';


class MenuContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModeAddMenu: false,
        }
    }

    componentDidMount = () => {
        const { a_updateMenu, position } = this.props;

        const db = new dbService();
        db.getMenuPositionList(position)
            .then(res => a_updateMenu({ menuList: res, isOldMenu: true }));
    }

    onToggleShow = isToggle => this.setState({ isModeAddMenu: isToggle });

    onChangeInput = e => this.input_text = e.target.value;

    onAddMenu = () => {
        this.onToggleShow(true);
    }

    onAddMenuItem = (title, submenu = false) => { //add new menu elem
        if (title === undefined) return;

        const { a_updateMenu, loginData, position } = this.props,
            link = (`/${(cyrillicToTranslit().transform(title, '_')).toLowerCase()}`),
            data = { title, position, link, submenu },
            db = new dbService();

        db.addMenu({ ...loginData, ...data })
            .then(() => {
                db.getMenuList()
                    .then(menuList => {
                        a_updateMenu({menuList});
                        this.onToggleShow(false);
                    });
            });
    }

    getFormAdd = () => {
        const { isModeAddMenu } = this.state;

        if (isModeAddMenu) {
            return (
                <>
                    <button onClick={() => this.onToggleShow(false)}>Отмена</button>
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

        return (
            <ButtonWithLogIn
                title="Добавить меню"
                onClick={() => this.onAddMenu()}
            />
        );

    }

    getRecursionSubmenuList = (menuItemData, menuList) => {
        const submenu_list = menuList.filter(item => menuItemData.ID === item.submenu);

        if (!submenu_list.length) return false; //Check have submenu list

        let list_menu_items = [];

        for (let i = 0, max = submenu_list.length; i < max; i++) { //go to all menu items in this lvl
            const menu_elem = submenu_list[i];
            const menu_item = (
                <MenuItemContainer
                    menuItemData={menu_elem}
                    addSubmenuItem={(title, submenu) => this.onAddMenuItem(title, submenu)}
                    key={i} //Probably wrong
                >
                    {this.getRecursionSubmenuList(menu_elem, menuList)}
                </MenuItemContainer>
            ); //If in menu item have submenu or submenu list - use recursion and go to are one level below
            list_menu_items = [...list_menu_items, menu_item];
        }
        return list_menu_items;
    }

    renderMenuList = () => {
        let { menuList } = this.props;
        // let { menuList } = this.state;
        const { position } = this.props;

        //get a menu list for particular position
        menuList = menuList.filter(item => position === item.position);

        return menuList.map((menuItemData, key) => {
            if (menuItemData.submenu) return false;

            const submenu_items = this.getRecursionSubmenuList(menuItemData, menuList);

            return (
                <MenuItemContainer
                    menuItemData={menuItemData}
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
                addingPanel={this.getFormAdd()}
                menuList={this.renderMenuList()}
                stylePos={position === 'top' ? 'menu menu--line' : 'menu'}
            />
        );
    }

}

const mapStateToProps = state => {
    return {
        menuList: selectors.getMenuList(state),
        isLogIn: selectors.isLogIn(state),
        loginData: selectors.loginData(state),
    };
}

const mapDispatchToProps = dispatch => {
    const { a_updateMenu } = bindActionCreators(actions, dispatch);

    return { a_updateMenu }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions';
import { selectors } from '../../redux/reducer';
import dbService from '../../service/service';
import { MenuItem } from '../../component/menu/MenuItem/MenuItem';


class MenuItemContainer extends Component {
    constructor(props) {
        super(props);
        this.db = new dbService();
        this.state = {
            isAddSubmenu: false,
            isEdit: false,
        }
    }

    disableDomActions = e => {
        e.preventDefault();
        e.stopPropagation();
    }

    handleDelete = e => { //delete
        this.disableDomActions(e);

        const { db } = this;

        const { a_updateMenu, loginData, menuItemData: { ID, position } } = this.props;

        const data = { ...loginData, ID };

        const ask = window.confirm(`Подтвердите удаление`);

        if (!ask) return;

        db.deleteMenu(data)
            .then(() => {
                db.updateMenuList(position, menuList => {
                    a_updateMenu(menuList);
                });
            });
    }

    handleEdit = e => { //succsessful edit
        this.disableDomActions(e);

        const { db } = this;

        const { a_updateMenu, loginData, menuItemData: { title, ID, position } } = this.props;

        let inputTitle = this.input_text;
        if (!inputTitle) inputTitle = title;

        const data = { ...loginData, ID, title: inputTitle };

        const ask = window.confirm(`Подтвердите редактирование`);

        if (!ask) return;

        db.editMenu(data)
            .then(() => {
                db.updateMenuList(position, menuList => {
                    a_updateMenu(menuList);
                    this.onEdit(false);
                });
            });
    }

    handleAddSubmenu = () => {
        const { addSubmenuItem, menuItemData: { ID } } = this.props;

        addSubmenuItem(this.input_text, ID);
        this.onAddSubmenu(false);
    }

    onEdit = (isToggle, e = false) => this.onToggleShow('isEdit', isToggle, e);

    onAddSubmenu = (isToggle, e = false) => this.onToggleShow('isAddSubmenu', isToggle, e);

    onToggleShow = (variable, isToggle, e) => {
        if (e) this.disableDomActions(e);
        this.setState({ [variable]: isToggle });
    }

    onChangeInput = e => {
        return this.input_text = e.target.value;
    }

    getEditPanel = () => {
        const { menuItemData: { title } } = this.props;

        return (
            <>
                <input type="text" defaultValue={title} onChange={this.onChangeInput} />
                <button onClick={this.handleEdit}>
                    OK
                </button>
                <button onClick={() => this.onEdit(false)}>
                    Отмена
                </button>
            </>
        );
    }

    onAddFormAddingSubmenu = () => { //For add submenu
        const { isAddSubmenu } = this.state;

        if (!isAddSubmenu) return false;

        return (
            <>
                <input type="text" onChange={this.onChangeInput} />
                <button onClick={() => this.handleAddSubmenu()}>
                    Добавить
                </button>
            </>
        );


    }


    render() {
        const { isEdit } = this.state;
        const { menuItemData } = this.props;

        if (isEdit) return this.getEditPanel();

        return (
            <MenuItem
                menuItemData={menuItemData}
                actions={
                    {
                        onEdit: e => this.onEdit(true, e),
                        handleDelete: e => this.handleDelete(e),
                        onAddSubmenu: e => this.onAddSubmenu(true, e),
                    }
                }
                childrens={this.props.children}
                formAddSubmenu={() => this.onAddFormAddingSubmenu()}
            />
        );
    }
}



const mapStateToProps = state => {
    return { loginData: selectors.loginData(state) }
}

const mapDispatchToProps = dispatch => {
    const { a_updateMenu } = bindActionCreators(actions, dispatch);
    return { a_updateMenu }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuItemContainer);
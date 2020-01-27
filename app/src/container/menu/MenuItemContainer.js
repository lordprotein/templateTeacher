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
    }
    disableDomActions = e => {
        e.preventDefault();
        e.stopPropagation();
    }

    handleDelete = e => { //delete
        this.disableDomActions(e);

        const { db } = this;

        const {
            a_removeAllModes, a_updateMenu,
            loginData,
            menuItem: { ID, position } } = this.props;

        const data = { ...loginData, ID };

        const ask = window.confirm(`Подтвердите удаление`);

        if (!ask) return;

        db.deleteMenu(data)
            .then(() => {
                db.updateMenuList(position, menuList => {
                    a_updateMenu(menuList);
                    a_removeAllModes();
                });
            });
    }

    handleEdit = e => { //succsessful edit
        this.disableDomActions(e);

        const { db } = this;

        const {
            a_removeAllModes, a_updateMenu,
            loginData,
            menuItem: { title, ID, position } } = this.props;

        let inputTitle = this.input_text;
        if (!inputTitle) inputTitle = title;

        const data = { ...loginData, ID, title: inputTitle };

        const ask = window.confirm(`Подтвердите редактирование`);

        if (!ask) return;

        db.editMenu(data)
            .then(() => {
                db.updateMenuList(position, menuList => {
                    a_updateMenu(menuList);
                    a_removeAllModes();
                });
            });
    }

    onEdit = e => {
        this.disableDomActions(e);

        const { a_toToggleEditMenu, menuItem: { ID } } = this.props;
        this.current_item_ID = ID;

        a_toToggleEditMenu(true);
    }

    onAddSubmenu = e => {
        this.disableDomActions(e);

        const { a_toToggleAddSubMenu, menuItem: { ID } } = this.props;
        this.current_item_ID = ID;

        a_toToggleAddSubMenu(true);
    }

    handleSaveInput = e => {
        return this.input_text = e.target.value;
    }

    getEditPanel = () => {
        const {
            a_removeAllModes,
            menuItem: { title }
        } = this.props;

        return (
            <>
                <input type="text" defaultValue={title} onChange={this.handleSaveInput} />
                <button onClick={this.handleEdit}>OK</button>
                <button onClick={a_removeAllModes}>Отмена</button>
            </>
        );
    }

    onAddFormAddingSubmenu = () => {
        const { current_item_ID } = this;

        const {
            statusAddSubMenu,
            menuItem: { ID }
        } = this.props;

        if (statusAddSubMenu && current_item_ID === ID) { //"current_item_ID" - render form for a particular element
            delete this.current_item_ID; //clear to cansel saving current_item_ID
            return (
                <>
                    <input type="text" onChange={this.handleSaveInput} />
                    <button onClick={() => this.props.addSubmenuItem(this.input_text, ID)}>
                        Добавить
                    </button>
                </>
            );
        }

    }


    render() {
        const { current_item_ID } = this;
        const {
            removeAllModes,
            statusEdit,
            menuItem, menuItem: { ID } } = this.props;


        if (statusEdit && current_item_ID === ID) {
            delete this.current_item_ID;
            return this.getEditPanel();
        }

        const actions = {
            onEdit: (e) => this.onEdit(e),
            handleDelete: (e) => this.handleDelete(e),
            onAddSubmenu: (e) => this.onAddSubmenu(e),
        }

        return (
            <MenuItem
                menuItem={menuItem}
                actions={actions}
                childrens={this.props.children}
                removeAllModes={removeAllModes}
                formAddSubmenu={() => this.onAddFormAddingSubmenu()}
            />
        );
    }
}






const mapStateToProps = state => {
    return {
        statusEdit: selectors.s_toggleEditMenu(state),
        statusAddSubMenu: selectors.s_toggleAddSubMenu(state),
        loginData: selectors.loginData(state),
    }
}

const mapDispatchToProps = dispatch => {
    const { a_toToggleEditMenu, a_toToggleAddSubMenu, a_removeAllModes, a_updateMenu } = bindActionCreators(actions, dispatch);
    return {
        a_toToggleEditMenu,
        a_toToggleAddSubMenu,
        a_removeAllModes,
        a_updateMenu
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuItemContainer);
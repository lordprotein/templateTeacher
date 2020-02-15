import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions';
import { selectors } from '../../redux/reducer';
import dbService from '../../service/service';
import { MenuItem } from '../../component/menu/MenuItem/MenuItem';
import { ButtonWithLogIn } from '../../component/button/Button/Button';
import PropTypes from 'prop-types';


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
        const { a_updateMenu, loginData, menuItemData: { ID }, menuList } = this.props;

        // const ask = window.confirm(`Подтвердите удаление`);

        // if (!ask) return;

        const data = { ...loginData, ID };


        db.deleteMenu(data)
            .then(() => {
                const numDeleteElem = menuList.findIndex(elem => elem.ID === ID);
                const newList = [...menuList.slice(0, numDeleteElem), ...menuList.slice(numDeleteElem + 1)];
                a_updateMenu({ menuList: newList });
            });
    }

    handleEdit = e => { //succsessful edit
        this.disableDomActions(e);

        const { db } = this,
            { a_updateMenu, loginData, menuItemData: { title, ID }, menuList } = this.props;

        let inputTitle = this.input_text;

        if (!inputTitle) inputTitle = title;

        const data = { ...loginData, ID, title: inputTitle };

        // const ask = window.confirm(`Подтвердите редактирование`);

        // if (!ask) return;

        const numEditElem = menuList.findIndex(elem => elem.ID === ID);
        menuList[numEditElem] = { ...menuList[numEditElem], title: inputTitle };

        db.editMenu(data)
            .then(() => {
                a_updateMenu({ menuList });
                this.onEdit(false);
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

    getAddSubmenuPanel = () => { //For add submenu
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

    getButtonsPanel = () => {
        return (
            <>
                <ButtonWithLogIn
                    title="Ред"
                    onClick={e => this.onEdit(true, e)}
                />
                <ButtonWithLogIn
                    title="Уд"
                    onClick={e => this.handleDelete(e)}
                />
                <ButtonWithLogIn
                    title="Подменю"
                    onClick={e => this.onAddSubmenu(true, e)}
                />
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
                getAddSubmenuPanel={() => this.getAddSubmenuPanel()}
                getButtonsPanel={() => this.getButtonsPanel()}
                childrens={this.props.children}
            />
        );
    }
}



const mapStateToProps = state => {
    return {
        loginData: selectors.loginData(state),
        menuList: selectors.getMenuList(state),
    }
}

const mapDispatchToProps = dispatch => {
    const { a_updateMenu } = bindActionCreators(actions, dispatch);
    return { a_updateMenu }
}





export default connect(mapStateToProps, mapDispatchToProps)(MenuItemContainer);

MenuItemContainer.propTypes = {
    menuItemData: PropTypes.object.isRequired,
    addSubmenuItem: PropTypes.func.isRequired,
};
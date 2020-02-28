import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions';
import { selectors } from '../../redux/reducer';
import dbService from '../../service/service';
import { MenuItem } from '../../component/menu/MenuItem/MenuItem';
import { ButtonWithLogIn } from '../../component/button/Button/Button';
import PropTypes from 'prop-types';
import btnStyles from '../../component/button/Button/Button.module.css';
import { MenuEditer } from '../../component/menu/MenuEditer/MenuEditer';


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
        const { a_updateMenu, menuItemData: { ID }, menuList } = this.props;

        const ask = window.confirm(`Подтвердите удаление`);
        if (!ask) return;

        db.deleteMenu(ID)
            .then(() => {
                const newList = menuList.filter(elem => elem.ID !== ID);
                a_updateMenu({ menuList: newList });
            });

    }

    handleEdit = e => { //succsessful edit
        this.disableDomActions(e);

        const { db } = this,
            { a_updateMenu, menuItemData: { title, ID }, menuList } = this.props;

        let inputTitle = this.input_text;

        if (!inputTitle) inputTitle = title;

        const data = { ID, title: inputTitle };

        const ask = window.confirm(`Подтвердите редактирование`);
        if (!ask) return;

        let newMenuList = [...menuList];
        const numEditElem = newMenuList.findIndex(elem => elem.ID === ID);
        newMenuList[numEditElem] = { ...menuList[numEditElem], title: inputTitle };


        db.editMenu(data)
            .then(() => {
                a_updateMenu({ menuList: newMenuList });
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

        const actions = {
            toReset: () => this.onEdit(false),
            toSubmit: (e) => this.handleEdit(e),
            handleChange: (e) => this.onChangeInput(e)
        }

        return (
            <MenuEditer {...actions} defValue={title} />
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
            <div>
                <ButtonWithLogIn
                    title="Подменю"
                    onClick={e => this.onAddSubmenu(true, e)}
                    className={btnStyles.add}
                    hint="Добавить подменю"
                />
                <ButtonWithLogIn
                    title="Ред"
                    onClick={e => this.onEdit(true, e)}
                    className={btnStyles.edit}
                    hint="Редактировать меню"
                />
                <ButtonWithLogIn
                    title="Уд"
                    onClick={e => this.handleDelete(e)}
                    className={btnStyles.remove}
                    hint="Удалить меню"
                />
            </div>
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
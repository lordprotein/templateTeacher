import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions';
import { selectors } from '../../redux/reducer';
import dbService from '../../service/service';


class MenuItem extends Component {


    onDelete = e => {
        e.preventDefault();
        e.stopPropagation();

        const db = new dbService();

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

    onEdit = e => {
        e.preventDefault();
        e.stopPropagation();


        const { a_toToggleEditMenu, menuItem: { ID } } = this.props;
        this.current_item_ID = ID;

        a_toToggleEditMenu(true);
    }

    addSubMenu = e => {
        e.preventDefault();
        e.stopPropagation();

        const { a_toToggleAddSubMenu, statusAddSubMenu, menuItem: { ID } } = this.props;
        this.current_item_ID = ID;


        a_toToggleAddSubMenu(true);
        console.log(statusAddSubMenu)

    }

    handleSubmitEdit = e => {
        e.preventDefault();
        e.stopPropagation();

        const db = new dbService();

        const {
            a_removeAllModes, a_updateMenu,
            loginData,
            menuItem: { title, ID, position } } = this.props;

        let inputTitle = this.input_text;
        if (!inputTitle) inputTitle = title;

        const data = { ...loginData, ID, title: inputTitle };


        db.editMenu(data)
            .then(() => {
                db.updateMenuList(position, menuList => {
                    a_updateMenu(menuList);
                    a_removeAllModes();
                });
            });


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
                <button onClick={this.handleSubmitEdit}>OK</button>
                <button onClick={a_removeAllModes}>Отмена</button>
            </>
        );
    }

    addFormAddingSubmenu = () => {
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
                    <button onClick={() => this.props.addSubmenuItem(this.input_text, ID)}>Добавить</button>
                </>
            );
        }

    }

    getMenuItem = () => {
        const { menuItem: { title, link, removeAllModes } } = this.props;

        return (
            <div className="menu__item">
                <Link
                    to={link}
                    className="menu__link"
                    onClick={removeAllModes}
                >
                    {title}
                    <button onClick={this.onEdit}>Ред</button>
                    <button onClick={this.onDelete}>Уд</button>
                    <button onClick={this.addSubMenu}>Подменю</button>
                </Link>

                <div className="menu__sub">
                    {this.props.children}
                    <div className="menu__item">
                        {this.addFormAddingSubmenu()}
                    </div>
                </div>


            </div >
        );
    }

    render() {
        const { current_item_ID } = this;
        const {
            statusEdit,
            menuItem: { ID } } = this.props;

        if (statusEdit && current_item_ID === ID) {
            delete this.current_item_ID;
            return this.getEditPanel();
        }
        else {
            return this.getMenuItem();
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);
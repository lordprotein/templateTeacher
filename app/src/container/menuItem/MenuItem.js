import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions';
import { selectors } from '../../redux/reducer';
import dbService from '../../dbService/dbService';


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
        this.currentItemID = ID;

        a_toToggleEditMenu(true);
    }

    onSubmit = e => {
        e.preventDefault();
        e.stopPropagation();

        const db = new dbService();

        const {
            a_removeAllModes, a_updateMenu,
            loginData,
            menuItem: { title, ID, position } } = this.props;

        let inputTitle = this.title;
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

    onSaveTitle = e => {
        return this.title = e.target.value;
    }

    render() {
        const { currentItemID } = this;
        const {
            a_removeAllModes,
            statusEdit,
            menuItem: { title, link, removeAllModes, ID } } = this.props;

        if (statusEdit && currentItemID === ID) {
            delete this.currentItemID;
            return (
                <>
                    <input type="text" defaultValue={title} onChange={this.onSaveTitle} />
                    <button onClick={this.onSubmit}>OK</button>
                    <button onClick={a_removeAllModes}>Отмена</button>
                </>
            )
        }
        else {
            return (
                <Link
                    to={link}
                    className="menu__link"
                    onClick={removeAllModes}
                >
                    {title}
                    <button onClick={this.onEdit}>Ред</button>
                    <button onClick={this.onDelete}>Уд</button>
                </Link>
            );
        }


    }
}


const mapStateToProps = state => {
    return {
        statusEdit: selectors.s_toggleEditMenu(state),
        loginData: selectors.loginData(state),
    }
}

const mapDispatchToProps = dispatch => {
    const { a_toToggleEditMenu, a_removeAllModes, a_updateMenu } = bindActionCreators(actions, dispatch);
    return {
        a_toToggleEditMenu,
        a_removeAllModes,
        a_updateMenu
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);
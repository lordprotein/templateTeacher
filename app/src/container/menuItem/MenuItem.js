import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class MenuItem extends Component {

    onDelete = () => {
        
    }

    onEdit = () => {
        
    }


    render() {
        const { title, link, removeAllModes } = this.props;
        return (
            <Link
                to={link}
                className="menu__link"
                onClick={removeAllModes}
            >
                {title}
                <button onClick={this.onDelete}>Ред</button>
                <button onClick={this.onEdit}>Уд</button>
            </Link>
        );
    }

}



export default connect()(MenuItem);
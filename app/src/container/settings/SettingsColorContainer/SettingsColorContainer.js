import React, { Component } from 'react';
import SettingsColor from '../../../component/settings/SettingsColor/SettingsColor';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../redux/actions';


class SettingsColorContainer extends Component {
    handleInput = e => {
        this.color = e.target.value;
    }

    setColor = () => {
        const { color } = this;
        const { a_setSettingsColor } = this.props;

        if (!color) return;

        a_setSettingsColor(color);
    }

    render() {
        return (
            <SettingsColor
                handleInput={this.handleInput}
                setColor={this.setColor}
            />
        );
    }
}


const mapDispatchToProps = dispatch => {
    const { a_setSettingsColor } = bindActionCreators(actions, dispatch);
    return { a_setSettingsColor };
}

export default connect(null, mapDispatchToProps)(SettingsColorContainer);
import React, { Component } from 'react';
import SettingsColor from '../../../component/settings/SettingsColor/SettingsColor';
import { connect } from 'react-redux';

class SettingsColorContainer extends Component {

    render() {
        return (
            <SettingsColor />
        );
    }
}

const mapStateToProps = state => {

}

const mapDispatchToProps = dispatch => {

}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsColorContainer);
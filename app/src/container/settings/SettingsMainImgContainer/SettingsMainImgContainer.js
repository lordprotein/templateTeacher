import React, { Component } from 'react';
import SettingsMainImg from '../../../component/settings/SettingsMainImg/SettingsMainImg';
import { connect } from 'react-redux';

class SettingsMainImgContainer extends Component {

    render() {
        return (
            <SettingsMainImg

            />
        );
    }
}

const mapStateToProps = state => {

}

const mapDispatchToProps = dispatch => {

}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsMainImgContainer);
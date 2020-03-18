import React, { Component } from 'react';
import SettingsNameSite from '../../../component/settings/SettingsNameSite/SettingsNameSite';
import { connect } from 'react-redux';

class SettingsNameSiteContainer extends Component {

    render() {
        return (
            <SettingsNameSite

            />
        );
    }
}

export default connect()(SettingsNameSiteContainer);
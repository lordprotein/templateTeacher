import React, { Component } from 'react';
import SettingsList from '../../../component/settings/SettingsList/SettingsList';
import SettingsMainImgContainer from '../SettingsMainImgContainer/SettingsMainImgContainer';
import SettingsNameSiteContainer from '../SettingsNameSiteContainer/SettingsNameSiteContainer';
import { connect } from 'react-redux';
// import SettingsColorContainer from '../SettingsColorContainer/SettingsColorContainer';

class SettingsListContainer extends Component {
    render() {
        return (
            <SettingsList>
                <SettingsNameSiteContainer />
                <SettingsMainImgContainer />
                {/* <SettingsColorContainer /> */}
            </SettingsList>
        );
    }
}


export default connect()(SettingsListContainer);
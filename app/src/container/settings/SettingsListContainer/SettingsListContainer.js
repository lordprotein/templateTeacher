import React, { Component } from 'react';
import SettingsList from '../../../component/settings/SettingsList/SettingsList';
import SettingsMainImgContainer from '../SettingsMainImgContainer/SettingsMainImgContainer';
import SettingsColorContainer from '../SettingsColorContainer/SettingsColorContainer';
import SettingsNameSiteContainer from '../SettingsNameSiteContainer/SettingsNameSiteContainer';

class SettingsListContainer extends Component {
    render() {
        return (
            <SettingsList>
                <SettingsNameSiteContainer />
                <SettingsMainImgContainer />
                <SettingsColorContainer />
            </SettingsList>
        );
    }
}

export default SettingsListContainer;
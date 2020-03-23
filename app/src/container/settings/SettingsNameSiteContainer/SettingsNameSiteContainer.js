import React, { Component } from 'react';
import SettingsNameSite from '../../../component/settings/SettingsNameSite/SettingsNameSite';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions';
import { bindActionCreators } from 'redux';
import { selectors } from '../../../redux/reducer';
import dbService from '../../../service/service';


class SettingsNameSiteContainer extends Component {
    setName = () => {
        const { name } = this;
        const { a_setSettingsSiteName } = this.props;
        if (!name) return;
        const db = new dbService();
        const data = {
            name: 'site_name',
            value: name
        }
        db.updateSettings(data)
            .then(() => a_setSettingsSiteName(name));

    }

    handleInput = e => {
        this.name = e.target.value;
    }

    render() {
        const { siteName } = this.props;
        return (
            <SettingsNameSite
                setName={this.setName}
                handleInput={this.handleInput}
                siteName={siteName}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        siteName: selectors.getSettingsSiteName(state),
    }
}

const mapDispatchToProps = dispatch => {
    const { a_setSettingsSiteName } = bindActionCreators(actions, dispatch);

    return { a_setSettingsSiteName };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsNameSiteContainer);
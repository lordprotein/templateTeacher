import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../component/Header/Header';
import { selectors } from '../../redux/reducer';


class HeaderContainer extends Component {

    render() {
        const { siteName, imgLink } = this.props;
        return (
            <Header
                title={siteName}
                imgLink={imgLink}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        siteName: selectors.getSettingsSiteName(state),
        imgLink: selectors.getSettingsMainImg(state)
    }
}


export default connect(mapStateToProps, null)(HeaderContainer);
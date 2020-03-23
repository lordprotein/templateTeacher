import React, { Component } from 'react';
import SettingsMainImg from '../../../component/settings/SettingsMainImg/SettingsMainImg';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../redux/actions';
import dbService from '../../../service/service';


class SettingsMainImgContainer extends Component {
    setImg = () => {
        const { img } = this;
        const { a_setSettingsMainImg } = this.props;

        if (!img) return;

        const db = new dbService();
        const data = { file: img };

        db.updateMainImage(data)
            .then(path => a_setSettingsMainImg(path))

    }

    handleInput = e => {
        this.img = e.target.files[0];
    }

    render() {
        return (
            <SettingsMainImg
                setImg={this.setImg}
                handleInput={this.handleInput}
            />
        );
    }
}


const mapDispatchToProps = dispatch => {
    const { a_setSettingsMainImg } = bindActionCreators(actions, dispatch);
    return { a_setSettingsMainImg };
}

export default connect(null, mapDispatchToProps)(SettingsMainImgContainer);
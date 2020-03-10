import React, { Component } from 'react';
import PositionControl from '../../component/PositionControl/PositionControl';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { selectors } from '../../redux/reducer';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import PositionControlItem from '../../component/PositionControlItem/PositionControlItem';
import dbService from '../../service/service';


class PositionControlItemContainer extends Component {
    constructor(props) {
        super(props);
        this.handleClick = null;
        this.getHandleClick();
    }

    getHandleClick = () => {
        const { direction } = this.props;

        switch (direction) {
            case 'up': {
                this.handleClick = () => this.toUpPost();
                return
            }
            case 'down': {
                this.handleClick = () => this.toDownPost();
                return
            }
            default: return;
        }
    }

    _toggleDownload = isToggle => {
        this.setState({ isDownload: isToggle })
    }

    toUpPost = () => {
        this._getNearbyPost();
    }

    toDownPost = () => {
        this._getNearbyPost();
    }

    _getNearbyPost = () => {
        const { direction, postList, postID, a_updateContent } = this.props;

        const numCurrentPost = postList.findIndex(item => item.ID === postID);



        let numSwitchPost = numCurrentPost;

        if (direction === 'up') {
            numSwitchPost -= 1;
            if (numSwitchPost < 0) return console.log(`Can\'t ${numSwitchPost}`);
        }
        if (direction === 'down') {
            numSwitchPost += 1;
            if (numSwitchPost >= postList.length) return console.log(`Can\'t ${numSwitchPost}`);
        }

        let newPostList = [...postList];

        newPostList[numCurrentPost] = {
            ...postList[numSwitchPost],
            sequence: postList[numCurrentPost].sequence
        };
        newPostList[numSwitchPost] = {
            ...postList[numCurrentPost],
            sequence: postList[numSwitchPost].sequence
        }


        a_updateContent(newPostList);

        const db = new dbService();
        const data = {
            current: {
                sequence: postList[numCurrentPost].sequence,
                ID: postList[numCurrentPost].ID
            },
            updated: {
                sequence: postList[numSwitchPost].sequence,
                ID: postList[numSwitchPost].ID
            }
        }

        db.sequencePost(data)
            .then(res => console.log(res),
                err => console.log(err));
    }

    render() {
        const { direction } = this.props;
        return (
            <PositionControlItem
                handleClick={this.handleClick}
                direction={direction}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        postList: selectors.getPostList(state),
    }
}

const mapDispatchToPros = dispatch => {
    const { a_updateContent } = bindActionCreators(actions, dispatch);
    return { a_updateContent }
}


export default connect(mapStateToProps, mapDispatchToPros)(PositionControlItemContainer);


// PositionControlContainer.propTypes = {
//     direction: PropTypes.string.isRequired
// }
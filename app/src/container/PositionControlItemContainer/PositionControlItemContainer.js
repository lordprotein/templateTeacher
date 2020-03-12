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
                this.handleClick = (e) => {
                    e.preventDefault();
                    this.toUpPost()
                };
                return
            }
            case 'down': {
                this.handleClick = (e) => {
                    e.preventDefault();
                    this.toDownPost()
                };
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
        const { direction, itemList, itemID, updateList, downloadToSever } = this.props;
        const numCurrentItem = itemList.findIndex(item => item.ID === itemID);

        let numSwitchItem = numCurrentItem;

        if (direction === 'up') {
            numSwitchItem -= 1;
            if (numSwitchItem < 0) return console.log(`Can\'t ${numSwitchItem}`);
        }
        if (direction === 'down') {
            numSwitchItem += 1;
            if (numSwitchItem >= itemList.length) return console.log(`Can\'t ${numSwitchItem}`);
        }

        console.log(numCurrentItem, numSwitchItem);



        const data = {
            current: {
                sequence: itemList[numCurrentItem].sequence,
                ID: itemList[numCurrentItem].ID
            },
            updated: {
                sequence: itemList[numSwitchItem].sequence,
                ID: itemList[numSwitchItem].ID
            }
        }

        downloadToSever(data)
            .then(
                (res) => {
                    console.log(res)
                    updateList({ numCurrentItem, numSwitchItem })
                },
                (err) => console.log(err)
            );
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


export default PositionControlItemContainer;


// PositionControlContainer.propTypes = {
//     direction: PropTypes.string.isRequired
// }
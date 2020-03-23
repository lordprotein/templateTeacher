import React, { Component } from 'react';
import PositionControlItem from '../../component/PositionControlItem/PositionControlItem';


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
        const isCheckSubmenu = itemList[0].submenu,
            currItemSubmenu = itemList[numCurrentItem].submenu,
            currItemPosition = itemList[numCurrentItem].position;

        if (direction === 'up') {

            if (isCheckSubmenu !== undefined) {

                do {
                    numSwitchItem -= 1;
                    if (numSwitchItem === 0 || currItemPosition !== itemList[numSwitchItem].position) return console.log('no');
                } while (currItemSubmenu !== itemList[numSwitchItem].submenu)
            }
            else {
                numSwitchItem -= 1;
                if (numSwitchItem < 0) return console.log(`Can't ${numSwitchItem}`);
            }
        }
        if (direction === 'down') {

            if (isCheckSubmenu !== undefined) {

                do {
                    numSwitchItem += 1;
                    if (numSwitchItem === itemList.length || currItemPosition !== itemList[numSwitchItem].position) return console.log('no');
                } while (currItemSubmenu !== itemList[numSwitchItem].submenu);

                console.log(numCurrentItem, numSwitchItem)
            }
            else {
                numSwitchItem += 1;
                if (numSwitchItem === itemList.length) return console.log(`Can't ${numSwitchItem}`);
            }
        }

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
                (res) => updateList({ numCurrentItem, numSwitchItem }),
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
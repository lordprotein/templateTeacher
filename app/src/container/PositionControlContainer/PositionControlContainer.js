import React, { Component } from 'react';
import PositionControl from '../../component/PositionControl/PositionControl';
import PropTypes from 'prop-types';
import { withLogIn } from '../../Hoc/withLogIn/withLogIn';
import { bindActionCreators } from 'redux';
import { selectors } from '../../redux/reducer';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import PositionControlItemContainer from '../PositionControlItemContainer/PositionControlItemContainer';
import dbService from '../../service/service';


class PositionControlContainer extends Component {
    constructor(props) {
        super(props);
        this.db = new dbService();
    }

    _getForPost = () => {
        const { postList, a_toSequenceContent } = this.props;

        return {
            itemList: postList,
            updateList: value => a_toSequenceContent(value),
            downloadToSever: data => this.db.sequencePost(data),
        }
    }

    // _getForMenu = () => {
    //     const { menuList, a_toSequenceMenu } = this.props;

    //     return {
    //         itemList: menuList,
    //         updateList: value => a_toSequenceMenu(value),
    //         downloadToSever: data => this.db.sequenceMenu(data),
    //     }
    // }


    render() {
        const { itemID, itemName } = this.props;

        let propsItem = null;

        if (itemName === 'post') propsItem = this._getForPost();

        return (
            <PositionControl>
                <PositionControlItemContainer
                    itemID={itemID}
                    direction="up"
                    {...propsItem}
                />
                <PositionControlItemContainer
                    itemID={itemID}
                    direction="down"
                    {...propsItem}
                />
            </PositionControl>
        );
    }
}

const mapStateToProps = state => {
    return {
        postList: selectors.getPostList(state),
        menuList: selectors.getMenuList(state),
    }
}

const mapDispatchToPros = dispatch => {
    const { a_toSequenceContent, a_toSequenceMenu } = bindActionCreators(actions, dispatch);
    return { a_toSequenceContent, a_toSequenceMenu }
}

export const PositionControlContainerWithLogin = withLogIn(PositionControlContainer);

export default connect(mapStateToProps, mapDispatchToPros)(PositionControlContainerWithLogin);


PositionControlContainer.propTypes = {
    itemName: PropTypes.string.isRequired
}
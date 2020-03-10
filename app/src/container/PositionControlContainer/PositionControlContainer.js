import React, { Component } from 'react';
import PositionControl from '../../component/PositionControl/PositionControl';
import PropTypes from 'prop-types';
import { withLogIn } from '../../Hoc/withLogIn/withLogIn';
import { bindActionCreators } from 'redux';
import { selectors } from '../../redux/reducer';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import PositionControlItemContainer from '../PositionControlItemContainer/PositionControlItemContainer';


class PositionControlContainer extends Component {
    render() {
        const { postID } = this.props;
        return (
            <PositionControl>
                <PositionControlItemContainer
                    postID={postID}
                    direction="up"
                />
                <PositionControlItemContainer
                    postID={postID}
                    direction="down"
                />
            </PositionControl>
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

export const PositionControlContainerWithLogin = withLogIn(PositionControlContainer);

export default connect(mapStateToProps, mapDispatchToPros)(PositionControlContainerWithLogin);


// PositionControlContainer.propTypes = {
//     direction: PropTypes.string.isRequired
// }
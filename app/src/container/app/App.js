import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../component/Header/Header';
import Sidebar from '../../component/Sidebar/Sidebar';
import { selectors } from '../../redux/reducer';
import { PageListWithRoutes } from '../../component/content/PageList/PageList';


class App extends Component {
    render() {
        const { isLogIn } = this.props;

        return (
            <>
                <Header isLogIn={isLogIn} />
                <Sidebar />
                <PageListWithRoutes />
            </>
        );
    }
}



const mapStateToProps = state => {
    return {
        isLogIn: selectors.isLogIn(state)
    };
}

export default connect(mapStateToProps, null)(App);
import React, { Component } from 'react';
import Header from '../header/Header';
import Content from '../content/Content';
import Sidebar from '../sidebar/Sidebar';



export default class App extends Component {

    generateRoutes = () => {

    }

    render() {
        return (
            <>
                <Header />
                <Sidebar />
                <Content />
            </>
        );
    }
}

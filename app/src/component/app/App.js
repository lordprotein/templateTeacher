import React, { Component } from 'react';
import Header from '../header/Header';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageName: 'New Title',
            menu: {
                top: [
                    {
                        title: 'One',
                        link: 'www.one.com',
                    },
                    {
                        title: 'Two',
                        link: 'www.two.com',
                    },
                    {
                        title: 'Three',
                        link: 'www.three.com',
                    }
                ]
            },
        }
    }

    render() {

        return (
            <>
                <h1>Hello</h1>
                <Header
                    titlePage={this.state.pageName}
                    elems={this.state.menu.top}
                />
            </>
        );
    }
}

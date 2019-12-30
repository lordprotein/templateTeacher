import React, { Component } from 'react';
import Header from '../header/Header';
import Menu from '../menu/Menu';
import Content from '../content/Content';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        return (
            <>
                <Header />

                <aside className="sidebar">
                    <Menu
                        position='left'
                    />
                </aside>

                <section class="content">
                    <Content />
                </section>
            </>
        );
    }
}

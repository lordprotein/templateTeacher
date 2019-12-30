import React, { Component } from 'react';

export default class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <>
                <h2 class="conten__title">Title</h2>
                <p class="content__text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad magnam a iure pariatur? Illum, doloremque odio
                    eaque corporis ipsum voluptatibus assumenda voluptatem, dignissimos quaerat dicta est nobis autem ratione
                    itaque!
		        </p>
            </>
        );
    }
}
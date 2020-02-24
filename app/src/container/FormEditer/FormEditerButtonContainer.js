import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class FormEditerButtonContainer extends Component {
    constructor(props) {
        super(props);
        this.action = null;
    }

    componentWillMount = () => {
        const { btnName } = this.props;

        switch (btnName) {
            case 'bold': {
                this.action = this._getBold;
                return;
            }
            case 'italic': {
                this.action = this._getItalic;
                return;
            }
            case 'link': {
                this.action = this._getLink;
                return;
            }

            default: return;
        }
    }

    _getWrapTag = (openTag, closeTag = false) => {
        const textarea = document.getElementById('form_editer');

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        if (!start && !end) return;

        if (!closeTag) closeTag = openTag;
        
        const selection = textarea.value.slice(start, end);

        textarea.setRangeText(` <${openTag}>${selection}</${closeTag}> `);
    }

    _getBold = () => this._getWrapTag('b');

    _getItalic = () => this._getWrapTag('i');
    
    _getLink = () => {
        const link = prompt('Введите ссылку');
        
        if (!link) return;

        this._getWrapTag(`a href="${link}"`, 'a');
    }
    

    render() {
        const { styleClass } = this.props;
        const { action } = this;

        return (
            <button className={styleClass} onClick={action} />
        );
    }
}

FormEditerButtonContainer.propTypes = {
    btnName: PropTypes.string.isRequired,
    styleClass: PropTypes.string
}
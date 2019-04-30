import React, { Component } from 'react';
import './styles/Content.css';
import Router from '../../config/router';

class Content extends Component {

    render() {
        return (
            <div className="content">
                <Router />
            </div>
        );
    }
}

export default Content;
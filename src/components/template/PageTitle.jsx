import React from 'react';
import './styles/PageTitle.css';

function PageTitle(props) {
    return (
        <div className="page-title">
            <h1><i className={props.icon ? `${props.icon}` : ''}></i>{props.main}</h1>
            <h2>{props.sub}</h2>
            <hr />
        </div>
    );
}

export default PageTitle;
import React from 'react';
import './styles/Stat.css';

function Stat(props) {
    return (
        <div className="stat">
            <div className="stat-icon">
                <i className={props.icon} style={{ color: props.color ? props.color : '#000' }}></i>
            </div>
            <div className="stat-info">
                <span className="stat-title">{props.title}</span>
                <span className="stat-value">{props.value}</span>
            </div>
        </div >
    )
}

export default Stat;
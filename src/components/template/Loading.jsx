import React from 'react';
import loading from '../../assets/loading.gif'
import './styles/Loading.css'

function Loading() {
    return (
        <div className="loading">
            <img src={loading} alt="Loading" />
        </div>
    )
}

export default Loading;
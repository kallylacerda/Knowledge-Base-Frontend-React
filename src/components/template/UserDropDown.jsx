import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../redux-flow/reducers/actions';
import { Link, withRouter } from 'react-router-dom';
import { userKey } from '../../global';

import './styles/UserDropDown.css';

class UserDropDown extends Component {

    logout() {
        localStorage.removeItem(userKey)
        this.props.setUser(null)
        this.props.history.push('/auth')
    }

    handleLink(e) {
        e.preventDefault()
        this.logout()
    }

    render() {
        const { props } = this;
        return (
            <div className="user-dropdown">
                <div className="user-button">
                    <span className="d-none d-sm-block">{props.user.name}</span>
                    <div className="user-dropdown-img">
                        <i className="fa fa-user-circle"></i>
                    </div>
                    <i className="fa fa-angle-down"></i>
                </div>
                <div className="user-dropdown-content">
                    {
                        props.user.admin ?
                            <Link to="/admin">
                                <i className="fa fa-cogs"></i>Administração
                            </Link>
                            : null
                    }
                    <a href="" onClick={this.handleLink.bind(this)}>
                        <i className="fa fa-sign-out"></i>Sair
                    </a>

                </div>
            </div >
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = (dispatch) => ({
    setUser: (user) => dispatch(setUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserDropDown));
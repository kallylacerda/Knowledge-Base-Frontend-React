import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleMenu } from '../../redux-flow/reducers/actions';
import './styles/Header.css';

import UserDropDown from './UserDropDown';

class Header extends Component {

    icon() {
        return this.props.isMenuVisible ? "fa-angle-left" : "fa-angle-down";
    }

    render() {
        const { props } = this;
        return (
            <header className="header">
                {
                    props.hideToggle ? null :
                        <i className="toggle" onClick={props.toggleMenu}>
                            <i className={`fa fa-lg ${this.icon()}`}></i>
                        </i>
                }

                <h1 className="title">
                    <Link to="/">{props.title}</Link>
                </h1>
                {
                    props.hideUserDropdown ? null :
                        <UserDropDown />
                }
            </header>
        );
    }
}

const mapStateToProps = (state) => ({
    isMenuVisible: state.isMenuVisible
})

const mapDispatchToProps = (dispatch) => ({
    toggleMenu: () => dispatch(toggleMenu())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
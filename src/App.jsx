import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from './redux-flow/reducers/actions';
import axios from 'axios';
import { baseApiUrl, userKey } from './global';
import Header from './components/template/Header';
import Menu from './components/template/Menu';
import Content from './components/template/Content';
import Footer from './components/template/Footer';
import Loading from './components/template/Loading';

import './App.css';

class App extends Component {
    constructor() {
        super();

        this.state = {
            validatingToken: true
        }
    }

    componentDidMount() {
        this.validateToken()
    }

    async validateToken() {
        this.setState({ validatingToken: true })
        const json = localStorage.getItem(userKey)
        const userData = JSON.parse(json)
        this.props.setUser(null)

        if (!userData) {
            this.setState({ validatingToken: false })
            this.props.history.push('/auth')
            return
        }

        const res = await axios.post(`${baseApiUrl}/validateToken`, userData)

        if (res.data) {
            this.props.setUser(res.data)
            localStorage.setItem(userKey, JSON.stringify(res.data))
        } else {
            localStorage.removeItem(userKey)
            this.props.history.push('/auth')
        }

        this.setState({ validatingToken: false })
    }

    render() {
        const { props, state } = this;
        return (
            <div className={`app ${(props.isMenuVisible && props.user) ? '' : 'hide-menu'}`}>
                <Header
                    title="React Knowledge - Base de conhecimento"
                    hideToggle={props.user ? false : true}
                    hideUserDropdown={props.user ? false : true}
                />
                {
                    props.user ? <Menu /> : null
                }
                {
                    state.validatingToken ? <Loading /> : <Content />
                }
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isMenuVisible: state.isMenuVisible,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    setUser: (user) => dispatch(setUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));

import React, { Component } from 'react'
import { baseApiUrl, showSuccess, showError, userKey } from '../../global';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../../redux-flow/reducers/actions';
import knowledge from '../../assets/knowledge.png';
import reactIcon from '../../assets/react-icon.svg';
import './Auth.css';

class Auth extends Component {
    constructor() {
        super();

        this.state = {
            showSignup: false,
            user: {}
        }
    }

    signin() {
        axios.post(`${baseApiUrl}/signin`, this.state.user)
            .then(res => {
                this.props.setUser(res.data)
                localStorage.setItem(userKey, JSON.stringify(res.data))
                this.props.history.push('/')
            })
            .catch(showError)
    }

    signup() {
        axios.post(`${baseApiUrl}/signup`, this.state.user)
            .then(() => {
                showSuccess()
                this.setState({ user: {} })
                this.setState({ showSignup: false })
            })
            .catch(showError)
    }

    handleName(event) {
        this.setState({ user: { ...this.state.user, name: event.target.value } });
    }

    handleEmail(event) {
        this.setState({ user: { ...this.state.user, email: event.target.value } });
    }

    handlePassword(event) {
        this.setState({ user: { ...this.state.user, password: event.target.value } });
    }

    handleConfirmPassword(event) {
        this.setState({ user: { ...this.state.user, confirmPassword: event.target.value } });
    }

    handleLink(e) {
        e.preventDefault()
        this.setState(state => ({ showSignup: !state.showSignup }))
    }

    render() {
        const { state } = this;

        return (
            <div className="auth-content">
                <div className="auth-modal">
                    <img src={reactIcon} width="200" alt="" />
                    <img src={knowledge} width="200" alt="" />
                    <hr />
                    <div className="auth-title">
                        {
                            state.showSignup ? 'Cadastro' : 'Login'
                        }
                    </div>
                    {
                        state.showSignup ?
                            <input type="text" value={state.user.name || ''}
                                onChange={this.handleName.bind(this)}
                                placeholder="Nome" />
                            : null
                    }
                    <input type="text" value={state.user.email || ''}
                        name="e-mail"
                        onChange={this.handleEmail.bind(this)}
                        placeholder="E-mail" />
                    <input type="password" value={state.user.password || ''}
                        name="password"
                        onChange={this.handlePassword.bind(this)}
                        placeholder="Senha" />
                    {
                        state.showSignup ?
                            <input type="password" value={state.user.confirmPassword || ''}
                                onChange={this.handleConfirmPassword.bind(this)}
                                placeholder="Confirme a senha" />
                            : null
                    }

                    {
                        state.showSignup ?
                            <button onClick={this.signup.bind(this)}>Registrar</button>
                            : <button onClick={this.signin.bind(this)}>Entrar</button>
                    }

                    <a href="" onClick={this.handleLink.bind(this)}>
                        {
                            state.showSignup ? <span>Já tem cadastro? Acesse o Login!</span>
                                : <span>Não tem cadastro? Registre-se aqui!</span>
                        }
                    </a>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = (dispatch) => ({
    setUser: (user) => dispatch(setUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Auth));
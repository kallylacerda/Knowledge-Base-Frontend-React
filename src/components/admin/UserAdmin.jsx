import React, { Component } from 'react';
import axios from 'axios';
import { baseApiUrl, showError, showSuccess } from '../../global';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Form, Col, Button } from 'react-bootstrap';

class UserAdmin extends Component {

    constructor() {
        super();

        this.state = {
            user: {},
            users: []
        }

        this.save = this.save.bind(this);
        this.remove = this.remove.bind(this);
        this.reset = this.reset.bind(this);
        this.loadUsers = this.loadUsers.bind(this);
        this.loadUser = this.loadUser.bind(this);
    }

    loadUsers() {
        axios.get(`${baseApiUrl}/users`).then(res => this.setState({ users: res.data }))
    }

    loadUser(user) {
        this.setState({ user })
    }

    componentDidMount() {
        this.loadUsers()
    }

    save() {
        const method = this.state.user.id ? 'put' : 'post'
        const id = this.state.user.id ? `/${this.state.user.id}` : ''

        axios[method](`${baseApiUrl}/users${id}`, this.state.user)
            .then(() => {
                showSuccess()
                this.reset()
            })
            .catch(showError)
    }

    remove(userId = '') {
        const id = userId || this.state.user.id
        axios.delete(`${baseApiUrl}/users/${id}`)
            .then(() => {
                showSuccess()
                this.reset()
            })
            .catch(showError)
    }

    reset() {
        this.setState({ user: {} })
        this.loadUsers()
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

    handleAdmin() {
        this.setState(state => ({ user: { ...this.state.user, admin: !state.user.admin } }));
    }

    render() {
        const { state } = this;

        const columns = [{
            dataField: 'id',
            text: 'ID',
            sort: true
        }, {
            dataField: 'name',
            text: 'Nome',
            sort: true
        }, {
            dataField: 'email',
            text: 'E-mail',
            sort: true
        }, {
            dataField: 'admin',
            text: 'Admin',
            sort: true,
            formatter: (cel) => cel ? 'Sim' : 'Não'
        }, {
            dataField: 'actions',
            isDummyField: true,
            text: 'Ações',
            formatter: (_, colIndex) => {
                return (
                    <div>
                        <Button variant="warning"
                            onClick={() => this.loadUser(colIndex)} className="mr-2">
                            <i className="fa fa-pencil"></i>
                        </Button>

                        <Button variant="danger"
                            onClick={() => this.remove(colIndex.id)} >
                            <i className="fa fa-trash"></i>
                        </Button>
                    </div>
                );

            }
        }];

        const defaultSorted = [{
            dataField: 'name',
            order: 'asc'
        }];

        return (
            <div className="user-admin" >

                <Form>
                    <Form.Control id="user-id" type="hidden" value={state.user.id || ''} />

                    <Form.Row>
                        <Col md="6" sm="12">
                            <Form.Group controlId="user-name">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={state.user.name || ''}
                                    placeholder="Informe o nome do usuário"
                                    onChange={this.handleName.bind(this)}
                                >
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md="6" sm="12">
                            <Form.Group controlId="user-email">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={state.user.email || ''}
                                    placeholder="Informe o e-mail do usuário"
                                    onChange={this.handleEmail.bind(this)}
                                >
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Row>
                        <Col md="6" sm="12">
                            <Form.Group controlId="user-password">
                                <Form.Label>Senha</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    value={state.user.password || ''}
                                    placeholder="Informe a senha do usuário"
                                    onChange={this.handlePassword.bind(this)}
                                >
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md="6" sm="12">
                            <Form.Group controlId="user-confirmPassword">
                                <Form.Label>Confirmação de senha</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    value={state.user.confirmPassword || ''}
                                    placeholder="Confirme a senha do usuário"
                                    onChange={this.handleConfirmPassword.bind(this)}
                                >
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Group>
                        <Form.Check id="user-admin" checked={state.user.admin || false} onChange={this.handleAdmin.bind(this)} label="Administrador" className="mt-3 mb-5" />
                    </Form.Group>

                    <Button variant="primary" onClick={this.save} >Salvar</Button>

                    <Button variant="secondary" className="ml-2" onClick={this.reset}>Cancelar</Button>
                </Form>

                <hr />

                <BootstrapTable hover striped
                    bordered={false}
                    keyField='id'
                    data={state.users}
                    columns={columns}
                    pagination={paginationFactory({ hideSizePerPage: true })}
                    defaultSorted={defaultSorted}
                />

            </div>
        )
    }
}

export default UserAdmin;
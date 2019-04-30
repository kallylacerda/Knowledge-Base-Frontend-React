import React, { Component } from 'react';
import axios from 'axios';
import { baseApiUrl, showError, showSuccess } from '../../global';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Form, Col, Button } from 'react-bootstrap';

class CategoryAdmin extends Component {

    constructor() {
        super();

        this.state = {
            category: {},
            categories: []
        }

        this.save = this.save.bind(this);
        this.remove = this.remove.bind(this);
        this.reset = this.reset.bind(this);
        this.loadCategories = this.loadCategories.bind(this);
        this.loadCategory = this.loadCategory.bind(this);
    }

    async loadCategories() {
        await axios.get(`${baseApiUrl}/categories`)
            .then(res => this.setState({
                categories: res.data.map(category => {
                    return { ...category }
                })
            }))
    }

    loadCategory(category) {
        this.setState({ category })
    }

    componentDidMount() {
        this.loadCategories()
    }

    save() {
        const method = this.state.category.id ? 'put' : 'post'
        const id = this.state.category.id ? `/${this.state.category.id}` : ''

        axios[method](`${baseApiUrl}/categories${id}`, this.state.category)
            .then(() => {
                showSuccess()
                this.reset()
            })
            .catch(showError)
    }

    remove(categoryId = '') {
        const id = categoryId || this.state.category.id
        axios.delete(`${baseApiUrl}/categories/${id}`)
            .then(() => {
                showSuccess()
                this.reset()
            })
            .catch(showError)
    }

    reset() {
        this.setState({ category: {} })
        this.loadCategories()
    }

    handleName(event) {
        this.setState({ category: { ...this.state.category, name: event.target.value } });
    }

    handleParentCategory(event) {
        this.setState({ category: { ...this.state.category, parentId: event.target.value } });
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
            dataField: 'path',
            text: 'Caminho',
            sort: true
        }, {
            dataField: 'actions',
            isDummyField: true,
            text: 'Ações',
            formatter: (_, colIndex) => {
                return (
                    <div>
                        <Button variant="warning"
                            onClick={() => this.loadCategory(colIndex)} className="mr-2">
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
            dataField: 'path',
            order: 'asc'
        }];

        return (
            <div className="category-admin" >

                <Form>
                    <Form.Control id="category-id" type="hidden" value={state.category.id || ''} />

                    <Form.Row>
                        <Col xs="12">
                            <Form.Group controlId="category-name">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={state.category.name || ''}
                                    placeholder="Informe o nome da categoria"
                                    onChange={this.handleName.bind(this)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="category-parentId">
                                <Form.Label>Categoria pai</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={state.category.parentId || ''}
                                    onChange={this.handleParentCategory.bind(this)}
                                >
                                    <option value=""></option>
                                    {
                                        state.categories.map(category =>
                                            <option key={category.path}
                                                value={category.id}>
                                                {category.path}
                                            </option>)
                                    }
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Form.Row>

                    <Button variant="primary" onClick={this.save} >Salvar</Button>

                    <Button variant="secondary" className="ml-2" onClick={this.reset}>Cancelar</Button>
                </Form>

                <hr />

                <BootstrapTable hover striped
                    bordered={false}
                    keyField='id'
                    data={state.categories}
                    columns={columns}
                    pagination={paginationFactory({ hideSizePerPage: true })}
                    defaultSorted={defaultSorted}
                />

            </div>
        )
    }
}

export default CategoryAdmin;
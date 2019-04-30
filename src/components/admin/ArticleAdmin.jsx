import React, { Component } from 'react';
import axios from 'axios';
import { baseApiUrl, showError, showSuccess } from '../../global';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Form, Col, Button } from 'react-bootstrap';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class ArticleAdmin extends Component {

    constructor() {
        super();

        this.state = {
            article: {},
            articles: [],
            categories: [],
            users: []
        }

        this.save = this.save.bind(this);
        this.remove = this.remove.bind(this);
        this.reset = this.reset.bind(this);
        this.loadArticles = this.loadArticles.bind(this);
        this.loadArticle = this.loadArticle.bind(this);
        this.loadCategories = this.loadCategories.bind(this);
        this.loadUsers = this.loadUsers.bind(this);
        this.handleContent = this.handleContent.bind(this);
    }

    loadArticles() {
        axios.get(`${baseApiUrl}/articles`).then(res => this.setState({ articles: res.data.articles }))
    }

    loadArticle(article) {
        axios.get(`${baseApiUrl}/articles/${article.id}`)
            .then(res => this.setState({ article: res.data }))
    }

    loadCategories() {
        const url = `${baseApiUrl}/categories`
        axios.get(url).then(res => this.setState({
            categories: res.data.map(category => {
                return { value: category.id, text: category.path }
            })
        }))
    }

    loadUsers() {
        const url = `${baseApiUrl}/users`
        axios.get(url).then(res => this.setState({
            users: res.data.map(user => {
                return { value: user.id, text: `${user.name} - ${user.email}` }
            })
        }))
    }

    componentDidMount() {
        this.loadArticles()
        this.loadCategories()
        this.loadUsers()
    }

    save() {
        const method = this.state.article.id ? 'put' : 'post'
        const id = this.state.article.id ? `/${this.state.article.id}` : ''

        axios[method](`${baseApiUrl}/articles${id}`, this.state.article)
            .then(() => {
                showSuccess()
                this.reset()
            })
            .catch(showError)
    }

    remove(articleId = '') {
        const id = articleId || this.state.article.id
        axios.delete(`${baseApiUrl}/articles/${id}`)
            .then(() => {
                showSuccess()
                this.reset()
            })
            .catch(showError)
    }

    reset() {
        this.setState({ article: {} })
        this.loadArticles()
    }

    handleName(event) {
        this.setState({ article: { ...this.state.article, name: event.target.value } });
    }

    handleDescription(event) {
        this.setState({ article: { ...this.state.article, description: event.target.value } });
    }

    handleImageUrl(event) {
        this.setState({ article: { ...this.state.article, imageUrl: event.target.value } });
    }

    handleCategoryArticle(event) {
        this.setState({ article: { ...this.state.article, categoryId: event.target.value } });
    }

    handleUserArticle(event) {
        this.setState({ article: { ...this.state.article, userId: event.target.value } });
    }

    handleContent(value) {
        this.setState({ article: { ...this.state.article, content: value } });
    }

    // Math.ceil(state.count / state.limit)
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
            dataField: 'description',
            text: 'Descrição',
            sort: true
        }, {
            dataField: 'actions',
            isDummyField: true,
            text: 'Ações',
            formatter: (_, colIndex) => {
                return (
                    <div>
                        <Button variant="warning"
                            onClick={() => this.loadArticle(colIndex)} className="mr-2">
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

        const modules = {
            toolbar: [
                [{ 'header': '1' }, { 'header': '2' }],
                [{ font: [] }, { size: [] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ align: [] }, 'direction'],
                [{ color: [] }, { background: [] }],
                [{ 'script': 'super' }, { 'script': 'sub' }, 'formula'],
                ['code-block', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                ['link', 'image', 'video'],
                ['clean']
            ]
        }

        return (
            <div className="article-admin" >

                <Form>
                    <Form.Control id="article-id" type="hidden" value={state.article.id || ''} />

                    <Form.Row>
                        <Col xs="12">
                            <Form.Group controlId="article-name">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={state.article.name || ''}
                                    placeholder="Informe o nome do artigo"
                                    onChange={this.handleName.bind(this)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="article-name">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={state.article.description || ''}
                                    placeholder="Informe o nome do artigo"
                                    onChange={this.handleDescription.bind(this)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="article-name">
                                <Form.Label>Imagem (URL)</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={state.article.imageUrl || ''}
                                    placeholder="Informe URL da imagem"
                                    onChange={this.handleImageUrl.bind(this)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="article-categoryId">
                                <Form.Label>Categoria</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={state.article.categoryId || ''}
                                    onChange={this.handleCategoryArticle.bind(this)}
                                >
                                    <option value=""></option>
                                    {
                                        state.categories.map(category =>
                                            <option key={category.text}
                                                value={category.value}>
                                                {category.text}
                                            </option>)
                                    }
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="article-userId">
                                <Form.Label>Autor</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={state.article.userId || ''}
                                    onChange={this.handleUserArticle.bind(this)}
                                >
                                    <option value=""></option>
                                    {
                                        state.users.map(user =>
                                            <option key={user.value}
                                                value={user.value}>
                                                {user.text}
                                            </option>)
                                    }
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="article-content">
                                <Form.Label>Conteúdo</Form.Label>

                                <ReactQuill theme={'snow'} value={state.article.content || ''} bounds={'.article-admin'}
                                    onChange={this.handleContent}
                                    modules={modules}
                                    placeholder="Conteúdo do artigo"
                                />

                            </Form.Group>

                        </Col>
                    </Form.Row>

                    <Button variant="primary" onClick={this.save} >Salvar</Button>

                    <Button variant="secondary" className="ml-2 " onClick={this.reset}>Cancelar</Button>
                </Form>

                <hr />

                <BootstrapTable hover striped
                    bordered={false}
                    keyField='id'
                    data={state.articles}
                    columns={columns}
                    pagination={paginationFactory({ hideSizePerPage: true })}
                    defaultSorted={defaultSorted}
                />

            </div>
        )
    }
}

export default ArticleAdmin;
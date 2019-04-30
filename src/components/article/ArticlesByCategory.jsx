import React, { Component } from 'react';
import axios from 'axios';
import { baseApiUrl } from '../../global';
import PageTitle from '../template/PageTitle';
import ArticleItem from './ArticleItem';
import './styles/ArticlesByCategory.css';


class ArticlesByCategory extends Component {
    constructor() {
        super();

        this.state = {
            category: {},
            articles: [],
            atual: 0,
            limit: 5
        }

        this.getCategory = this.getCategory.bind(this)
        this.handleArticles = this.handleArticles.bind(this)
    }

    async componentWillReceiveProps(to) {

        await this.setState({ category: { id: to.match.params.id } })
        await this.getCategory()
        await this.getArticles()
    }

    async componentDidMount() {
        await this.setState({ category: { id: this.props.match.params.id } })
        await this.getCategory()
        await this.getArticles()
    }

    getCategory() {
        const url = `${baseApiUrl}/categories/${this.state.category.id}`
        axios(url).then(res => this.setState({ category: res.data }))
    }

    getArticles() {
        const url = `${baseApiUrl}/categories/${this.state.category.id}/articles`
        axios(url).then(res => this.setState({ articles: res.data }))
    }

    handleArticles() {
        this.setState(state => ({ limit: state.limit + 5 }))
    }

    render() {
        const { state } = this;

        const articles = [];

        for (let i = state.atual; i < (state.articles.length > state.limit ? state.limit : state.articles.length); i++) {
            articles[i] = state.articles[i];
        }

        return (
            <div className="articles-by-category">
                <PageTitle icon="fa fa-folder-o" main={this.state.category.name} sub="Categoria" />
                <ul>
                    {
                        articles.map(article => <li key={article.id}>
                            <ArticleItem article={article} /></li>)
                    }

                </ul>

                <div className="load-more-button">
                    {
                        state.articles.length > state.limit ?
                            <button
                                className="btn btn-lg btn-outline-primary"
                                onClick={this.handleArticles}
                            >Carregar mais</button> : null
                    }
                </div>
            </div>

        )
    }
}

export default ArticlesByCategory;
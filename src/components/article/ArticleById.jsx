import React, { Component } from 'react';
import { baseApiUrl } from '../../global';
import axios from 'axios';
import PageTitle from '../template/PageTitle';
import parse from 'html-react-parser';
import './styles/ArticleById.css';

class ArticleById extends Component {
    constructor() {
        super();

        this.state = {
            article: {}
        }
    }

    async componentDidMount() {
        const url = `${baseApiUrl}/articles/${this.props.match.params.id}`
        axios(url).then(res => this.setState({ article: res.data }))
    }

    render() {
        const { state } = this;
        return (
            <div className="article-by-id">
                <PageTitle icon="fa fa-file-o" main={state.article.name} sub={state.article.description} />
                <div className="article-content">
                    {
                        parse(`${state.article.content}`)
                    }
                </div>
            </div>
        )
    }

}

export default ArticleById;
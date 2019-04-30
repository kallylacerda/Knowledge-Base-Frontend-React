import React, { Component } from 'react';
import PageTitle from '../template/PageTitle';
import Stat from './Stat';
import axios from 'axios';
import { baseApiUrl } from '../../global';
import './styles/Home.css';

class Home extends Component {
    constructor() {
        super();

        this.state = {
            stat: {}
        }
    }

    getStats() {
        axios.get(`${baseApiUrl}/stats`).then(res => this.setState({ stat: res.data }))
    }

    componentDidMount() {
        this.getStats();
    }

    render() {
        const { state } = this;
        return (
            <div className="home" >
                <PageTitle icon="fa fa-home" main="Dashboard" sub="Base de conhecimento" />
                <div className="stats">
                    <Stat
                        title="Categorias"
                        value={state.stat.categories}
                        icon="fa fa-folder"
                        color="#d54d50"
                    />
                    <Stat
                        title="Artigos"
                        value={state.stat.articles}
                        icon="fa fa-file"
                        color="#3bc480"
                    />
                    <Stat
                        title="Usuários"
                        value={state.stat.users}
                        icon="fa fa-user"
                        color="#3282cd"
                    />
                </div>
            </div>
        )
    }
}

export default Home;
import React from 'react';
import PageTitle from '../template/PageTitle';
import ArticleAdmin from './ArticleAdmin';
import CategoryAdmin from './CategoryAdmin';
import UserAdmin from './UserAdmin';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Card from 'react-bootstrap/Card';

import './styles/AdminPages.css';

function AdminPages() {
    return (
        <div id="toast" className="admin-pages">
            <PageTitle icon="fa fa-cogs" main="Administração do sistema" sub="Cadastros & cia" />
            <div className="admin-pages-tabs">
                <Tabs mountOnEnter unmountOnExit defaultActiveKey="articles" id="tabs-admin-pages" className="tabs-admin-pages" style={{ padding: '15px 0 0 10px' }}>
                    <Tab eventKey="articles" title="Artigos">
                        <Card body>
                            <ArticleAdmin />
                        </Card>
                    </Tab>
                    <Tab eventKey="categories" title="Categorias">
                        <Card body>
                            <CategoryAdmin />
                        </Card>
                    </Tab>
                    <Tab eventKey="users" title="Usuários">
                        <Card body>
                            <UserAdmin />
                        </Card>
                    </Tab>
                </Tabs>
            </div>
        </div >
    )
}

export default AdminPages;
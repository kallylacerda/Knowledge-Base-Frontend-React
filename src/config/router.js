import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from '../components/home/Home';
import AdminPages from '../components/admin/AdminPages';
import ArticlesByCategory from '../components/article/ArticlesByCategory';
import ArticleById from '../components/article/ArticleById';
import Auth from '../components/auth/Auth';

import { userKey } from '../global';

function Router() {
    return (
        <Switch>
            <EnteredRoute path="/auth" component={Auth} />
            <AutenticateRoute path="/" exact component={Home} />
            <PrivateRoute path="/admin" component={AdminPages} />
            <AutenticateRoute path="/categories/:id/articles" component={ArticlesByCategory} />
            <AutenticateRoute path="/articles/:id" component={ArticleById} />
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
    )
}

function PrivateRoute({ component: Component, ...rest }) {
    const user = JSON.parse(localStorage.getItem(userKey))
    return (<Route
        {...rest}
        render={props =>
            user.admin ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                )
        }
    />
    )
}

function AutenticateRoute({ component: Component, ...rest }) {
    const user = JSON.parse(localStorage.getItem(userKey))
    return (<Route
        {...rest}
        render={props =>
            user ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: "/auth", state: { from: props.location } }} />
                )
        }
    />
    )
}

function EnteredRoute({ component: Component, ...rest }) {
    const user = JSON.parse(localStorage.getItem(userKey))
    return (<Route
        {...rest}
        render={props =>
            user ? (
                <Redirect to={{ pathname: "/", state: { from: props.location } }} />
            ) : (
                    <Component {...props} />
                )
        }
    />
    )
}

export default Router;
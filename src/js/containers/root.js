/**
 * Created by sunxianxiong on 17/1/26.
 */
import React, { Component } from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { createHashHistory } from 'history';
import NProgress from 'nprogress';
import Home from './all';

import App from './app';


// const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

var All = (location, cb) => {
    NProgress.start();
    require.ensure([], require => {
        cb(null, require('../containers/all.js').default);
    }, 'all');
};
var TAGS = (location, cb) => {
    NProgress.start();
    require.ensure([], require => {
        cb(null, require('../containers/tags.js').default);
    }, 'tags');
};
var ARCHIVE = (location, cb) => {
    NProgress.start();
    require.ensure([], require => {
        cb(null, require('../containers/archive.js').default);
    }, 'archive');
};
var ARTICLE = (location, cb) => {
    NProgress.start();
    require.ensure([], require => {
        cb(null, require('../containers/acticleCon.js').default);
    }, 'article');
};
const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="all" getComponent={All} />
        <Route path="tags" getComponent={TAGS} />
        <Route path="archive" getComponent={ARCHIVE} />
        <Route path="article/:id" getComponent={ARTICLE} />
    </Route>
);

export default class Root extends Component {
    render() {
        return <Router history={hashHistory} routes={routes} />
    }
};
/**
 * Created by sunxianxiong on 17/1/23.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './containers/app';
import AppStore from './stores/appStore';

function getQueryString(name) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    const r = window.location.search.substr(1).match(reg);

    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

const appStore = new AppStore();
const uiStore = appStore.uiStore;
const blogListStore = appStore.blogListStore;
const MOUNT_NODE = document.getElementById('app');

const isDebug = getQueryString('debugging');
if (__DEV__ || isDebug) {
    window.appStore = appStore;
    window.uiStore = uiStore;
    window.blogListStore = blogListStore;
    const enableLogging = require('mobx-logger').default;
    enableLogging({
        predicate: () => true,
        action: true,
        reaction: true,
        transaction: true,
        compute: true
    });
}

ReactDOM.render(
    <Provider appStore={appStore}
              uiStore={uiStore}
              blogListStore={blogListStore}>
        <App />
    </Provider>,
    MOUNT_NODE
);
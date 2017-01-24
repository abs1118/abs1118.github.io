/**
 * Created by sunxianxiong on 17/1/23.
 */
import React, { Component } from 'react';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import '../styles/app.less'
export default class App extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Header className="blog-header">
                        <div className="blog-header-title">
                            独自闯天涯的博客
                        </div>
                    </Header>
                    <Layout>
                        <Sider className="blog-sider">
                            <div className="blog-sider-logo">
                            </div>
                        </Sider>
                        <Content>Content</Content>
                    </Layout>
                </Layout>
            </div>
        );


    }
};
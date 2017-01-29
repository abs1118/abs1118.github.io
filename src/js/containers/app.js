/**
 * Created by sunxianxiong on 17/1/23.
 */
import React, { Component } from 'react';
import { Layout } from 'antd';
import Menu  from '../components/menu';
import { inject, observer } from 'mobx-react';
const { Header, Footer, Sider, Content } = Layout;

import '../styles/app.less'
@inject('appStore', 'blogListStore','uiStore')
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
                            <Menu></Menu>
                        </Sider>
                        <Content>
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );


    }
};
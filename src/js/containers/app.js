/**
 * Created by sunxianxiong on 17/1/23.
 */
import React, { Component } from 'react';
import { Layout } from 'antd';
import Menu  from '../components/menu';
import { inject, observer } from 'mobx-react';
const { Header, Footer, Sider, Content } = Layout;

import '../styles/app.less'
import '../styles/blogList.less'
@inject('appStore', 'blogListStore','uiStore')
export default class App extends Component {
    constructor(props) {
        super(props);
        this.addDuoshuoComment = this.addDuoshuoComment.bind(this);
    }

    componentDidMount() {

        // 添加多说评论框
        this.addDuoshuoComment();

    }

    addDuoshuoComment() {
        window.duoshuoQuery = {short_name:"abs1118"};
        (function() {
            var ds = document.createElement('script');
            ds.type = 'text/javascript';ds.async = true;
            ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
            ds.charset = 'UTF-8';
            (document.getElementsByTagName('head')[0]
            || document.getElementsByTagName('body')[0]).appendChild(ds);
        })();
    }
    render() {
        return (
            <div>
                <Layout>
                        <Sider className="blog-sider">
                            <Menu></Menu>
                        </Sider>
                        <Content className="blog-main">
                            {this.props.children}
                        </Content>
                </Layout>
            </div>
        );


    }
};
/**
 * Created by sunxianxiong on 17/1/27.
 */
import React, { Component } from 'react';
import Article from '../components/article.js';
import { inject, observer } from 'mobx-react';
import { Spin } from 'antd';

@inject('appStore', 'blogStore')
@observer
export default class ArticleCon extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { blogStore } = this.props;
        const { id } = this.props.params;
        blogStore.getBlog(id);
    }


    render() {
        const {blog,loading} = this.props.blogStore;

        return (
            <div>
                <Spin tip="加载中..." spinning={loading}>
                    {
                        loading?(<div></div>):(<Article {...blog}  key={this.props.params.id} />)
                    }
                </Spin>
            </div>
        );
    }

    componentDidMount(){
        this.props.blogStore.loading = true;
    }
};


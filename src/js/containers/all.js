/**
 * Created by sunxianxiong on 17/1/26.
 */
import React, { Component } from 'react';
import { Spin } from 'antd';
import { inject, observer } from 'mobx-react';
import ItemView from '../components/itemView';

@inject('appStore', 'blogListStore')
@observer
export  default  class All extends Component {
    componentWillMount() {
        const { blogListStore, appStore } = this.props;
        if(blogListStore.loading){
            blogListStore.getBlogs();
        }
    }

    render() {
        const {blogList,loading} = this.props.blogListStore;
        return (
            <Spin tip="加载中..." spinning={loading}>
                <div className="blog-list">
                    <ItemView title="全部" items={blogList.toJS()} />
                </div>
            </Spin>
        );
    }

    componentDidMount() {
    }
};
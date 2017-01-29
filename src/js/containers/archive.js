/**
 * Created by sunxianxiong on 17/1/27.
 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {Spin} from 'antd';
import ItemView from '../components/itemView';

@inject('appStore', 'blogListStore')
@observer
export  default  class All extends Component {
    constructor(props) {
        super(props);
        this.tagsList = this.tagsList.bind(this);
    }
    componentWillMount() {
        const { blogListStore, appStore } = this.props;
        if(blogListStore.loading){
            blogListStore.getBlogs();
        }
    }

    tagsList(items) {
        let year = 0,
            articles = {};

        for (let i = 0; i < items.length; i++) {
            let time = items[i]['time'];

            if (time !== year) {
                articles[time + ''] = [];
                year = time;
            }

            articles[time + ''].push(items[i]);
        }

        return articles;
    }

    render() {
        const {blogList,loading} = this.props.blogListStore;
        let articles = this.tagsList(blogList),
            view = [];

        for (let label in articles) {
            view.push(<ItemView key={label} title={label} items={articles[label]} />);
        }
        return (
            <div className="list">
                    <Spin tip="加载中..." spinning={loading}>
                            {view}
                        </Spin>
            </div>
        );
    }
};
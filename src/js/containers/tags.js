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
        let list = items,
            articles = {};

        for (let i = 0, listLen = list.length; i < listLen; i++) {
            let labels = list[i]['labels'];

            for (let j = 0, labelsLen = labels.length; j < labelsLen; j++) {
                let name = labels[j]['name'];
                if ( !articles.hasOwnProperty(name) ) {
                    articles[name] = [];
                }
                articles[name].push(list[i]);

            }
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
            <div className="blog-list">
                <Spin tip="加载中..." spinning={loading}>{view}</Spin>
            </div>
        );
    }
};
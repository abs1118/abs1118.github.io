/**
 * Created by sunxianxiong on 17/1/27.
 */
import React, { Component } from 'react';
import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
export  default class Article extends Component{
    componentWillMount() {
        window.scrollTo(0, 0);
        hljs.initHighlightingOnLoad();
        // 代码高亮
        marked.setOptions({
            highlight: function (code) {
                return hljs.highlightAuto(code).value;
            }
        });
    }

    componentDidMount() {
        // 显示多说评论框
        this.toggleDuoshuoComment();
    }

    toggleDuoshuoComment() {
        let ele = this.refs['ds'];
        try {
            window.DUOSHUO.EmbedThread(ele);
        } catch(e) {

        }
    }

    render() {
        return (
            <div id="articleBox">
                <div className="article">
                    <h1 className="article-title">{this.props.title}</h1>
                    <p className="article-time">
                        发表于{this.props.time}｜<span className="ds-thread-count" data-thread-key={this.props.number} data-count-type="comments"></span>｜
                        <span id="busuanzi_container_page_pv">
                        阅读量<span id="busuanzi_value_page_pv"></span>次
                        </span>
                    </p>
                    <div className="article-desc article-content"
                         dangerouslySetInnerHTML={{__html: marked(this.props.content)}}>
                    </div>
                </div>
                <div className="article">
                    <div ref="ds" className="ds-thread" data-thread-key={this.props.number} data-title={this.props.title} data-url={window.location.href}></div>
                </div>
            </div>
        );
    }
};
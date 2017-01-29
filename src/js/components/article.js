/**
 * Created by sunxianxiong on 17/1/27.
 */
import React, { Component } from 'react';
import marked from 'marked';
import hljs from 'highlight.js';
export  default class Article extends Component{
    componentWillMount() {
        window.scrollTo(0, 0);

        // 代码高亮
        marked.setOptions({
            highlight: function (code) {
                return hljs.highlightAuto(code).value;
            }
        });
    }

    render() {
        return (
            <div>
                <div className="article">
                    <h1 className="article-title">{this.props.title}</h1>
                    <p className="article-time">{this.props.time}</p>
                    <div className="article-desc article-content"
                         dangerouslySetInnerHTML={{__html: marked(this.props.content)}}>
                    </div>
                </div>
            </div>
        );
    }
};
import React, { Component } from 'react';

const prefix = 'blog-list';
export default class Item extends Component {

    // componentDidMount() {
    //     // 显示多说评论框
    //     this.toggleDuoshuoComment();
    // }
    //
    // toggleDuoshuoComment() {
    //     let ele = this.refs['comment-count'];
    //     try {
    //         window.DUOSHUO.EmbedThread(ele);
    //     } catch(e) {
    //
    //     }
    // }

  render() {
      let {content} = this.props;
      let description = content&&content.length>250?content.substr(0,250).replace(/&emsp;/g,' ')+'...':content.replace(/&emsp;/g,' ');
    return (
      <li className="blog-list-article">
          <div className={`${prefix}-article-title`}>
              <span className="ico ico_type_Original"></span>
              <h1>
                <span className={`${prefix}-article-title-link`}>
                    <a href={'#article/' + this.props.number}>{this.props.title}</a>
                </span>
              </h1>
          </div>

          <div className={`${prefix}-article-description`}>
              {description}
          </div>
          <div className={`${prefix}-article-manage`}>
              <span className={`${prefix}-article-manage-create-time`}>{this.props.create_time}</span>


              <span className={`${prefix}-article-manage-view`} title="阅读次数"><a href={'#article/' + this.props.number} title="阅读次数">阅读</a>(564)</span>
              <span className={`${prefix}-article-manage-comments`} title="评论次数">
                  <a href={'#article/' + this.props.number} title="评论次数">评论</a>(
                  <span className="ds-thread-count" data-thread-key={this.props.number} data-count-type="comments"></span>)
              </span>
          </div>

          <div className="clear"></div>
      </li>
    );
  }
};
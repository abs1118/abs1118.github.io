import React, { Component } from 'react';


const prefix = 'blog-list';
export default class Item extends Component {

  render() {
      let {content} = this.props;
      let description = content&&content.length>250?content.substr(0,250)+'...':content;
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
              <span className={`${prefix}-article-manage-comments`} title="评论次数"><a href="" title="评论次数">评论</a>(0)</span>

          </div>

          <div className="clear"></div>
      </li>
    );
  }
};
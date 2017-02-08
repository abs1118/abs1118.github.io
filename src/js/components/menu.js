import React, { Component } from 'react';
import { Link } from 'react-router';
import NProgress from 'nprogress';

class Menu extends Component {
  render() {
    return (
      <div id="home" className="home">
          <div className="blog-sider-logo">
          </div>
          <div className="blog-sider-content">
              <h1>
                  <a href="/">孙先雄</a>
              </h1>
              <span className="blog-sider-content-span">个人站</span>
              <hr className="first-hr"/>
              <p className="blog-sider-content-p">欢迎来到我的个人站</p>
              <hr className="second-hr"/>
              <div className="blog-sider-content-sider">
                  <ul>
                      <li><Link to="all">全部</Link></li>
                      <li><Link to="archive">归档</Link></li>
                      <li><Link to="tags">标签</Link></li>
                      <li><Link to="">关于我</Link></li>
                  </ul>
              </div>

          </div>
      </div>
    );
  }
};

export default Menu;
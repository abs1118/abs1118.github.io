import React, { Component } from 'react';
import { Link } from 'react-router';
import NProgress from 'nprogress';

class Menu extends Component {
  render() {
    return (
      <div id="home">
          <div className="blog-sider-logo">
          </div>
          <div>
              <div style={{textAlign:'center',margin: '15px 0'}}><a href="/">独自闯天涯</a></div>
              <ul>
                  <li><Link to="all">全部</Link></li>
                  <li><Link to="archive">归档</Link></li>
                  <li><Link to="tags">标签</Link></li>
              </ul>
          </div>
      </div>
    );
  }
};

export default Menu;
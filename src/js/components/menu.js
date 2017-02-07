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
              <div style={{textAlign:'center',margin: '15px 0'}}>
                  <a href="/">独自闯天涯</a>
                  <div style={{color:'#fff'}}>
                      <span id="busuanzi_container_site_pv">
                        总访问量<span id="busuanzi_value_site_pv"></span>次
                      </span>
                  </div>
              </div>
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
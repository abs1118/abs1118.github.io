import React, { Component } from 'react';
import Item from './Item.js';

export default class ItemView extends Component {
  render() {
    return (
      <div>
        <h2 className="category">{this.props.title}</h2>
        <ul>
          {
            this.props.items.map((item, index) => 
              <Item {...item} key={index} />
            )
          }
        </ul>
      </div>
    );
  }
};
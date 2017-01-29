import React, { Component } from 'react';

export default class Item extends Component {
  render() {
    return (
      <li className="list-post">
        <span className="date-long">{this.props.create_time}</span>
        <a href={'#article/' + this.props.number}>{this.props.title}</a>
      </li>
    );
  }
};
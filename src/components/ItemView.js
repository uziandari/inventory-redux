import React, { Component } from 'react';

import '../styles/userHome.css';

export default class ItemView extends Component {

  render() {

    const item = (<div>{this.props.sku}</div>)

    return (
      <div className="item-wrapper">
        {item ? <h1>{item.sku}</h1> : `no`}
      </div>
    );
  }
}

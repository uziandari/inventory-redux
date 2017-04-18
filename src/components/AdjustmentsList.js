import React, { Component } from 'react';


export default class AdjustmentsList extends Component {
  render() {
    var itemsNode = this.props.adjustments.map((item, index) => {
      return (
        <tr key={index}>
          <td className={item.sku === item.term ? "term-match" : null }>{item.sku}</td>
          <td className={item.sku === item.term ? "term-match" : null }>{item.date}</td>
          <td className={item.sku === item.term ? "term-match" : null }>{item.change}</td>
        </tr>
      );
    }); 

    return (
      <table className="table table-hover table-condensed adj-table">
        {(this.props.adjustments.length > 0) ? <caption>Total Adjustments: {this.props.adjustments.adjTotal}</caption> : null}
        <thead>
          <tr>
            <th>SKU</th>
            <th>Date</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {this.props.adjustments.length === 0 ? <tr><td>No Adjustments Found.</td></tr> : itemsNode}
        </tbody>
      </table>
    );
  }

}


  

import React, { Component } from 'react';
import { Link } from 'react-router';

export default class ReceiptView extends Component {
   
   render() {
     if (!this.props.receipts) { 
       return (
         <div className="loading">
           <h2>Loading...</h2>
         </div>
       );
      } else {
      var receiptsNode = this.props.receipts.receipts.map((receipt, index) => {
        return (
          <div key={index} className="receipt-item">
            <ul>
              <li>{receipt.sku}</li>
              <li>{receipt.quantityReceived}</li>
            </ul>
          </div>
        );
      }); 
      return (
        <div id="receipts-wrapper">
          {receiptsNode}
        </div>
      );
    }
    

    
  }

}
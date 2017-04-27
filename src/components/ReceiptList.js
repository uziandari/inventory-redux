import React from 'react';
import { Link } from 'react-router';

const ReceiptList = (receiptId) => {
  const receiptItems = receiptId.receiptId.map((item, index) => {
    return (
      <tr key={index}>
        <td><Link to={`/inventory/${item.sku}`}>{item.sku}</Link></td> 
        <td>{item.description}</td>
        <td>{item.quantityReceived}</td>
        <td>{item.currentLocation}</td>
        <td>{item.currentBackstock}</td>
        <td>{item.currentStock}</td>
      </tr>
    ); 
  });
  return (
    <table className="table table-striped table-condensed">
      <thead>
        <tr>
          <th>SKU</th>
          <th>Description</th>
          <th># Received</th>
          <th>Current Location</th>
          <th>Current Backstock</th>
          <th>Current #</th>
        </tr>
      </thead>
      <tbody>
        {receiptItems}
      </tbody>
    </table>
    
  );
}


export default ReceiptList;
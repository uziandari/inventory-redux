import React from 'react';
import { Link } from 'react-router';

const ReceiptList = (props) => {
  const receiptItems = props.receipts.map((item, index) => {
    return (
      <tr key={index}>
        <td><Link to={`/inventory/${item.sku}`}>{item.sku}</Link></td> 
        <td>{item.description}</td>
        <td>{item.quantityReceived}</td>
        <td>{item.currentLocation}</td>
        <td>{item.currentBackstock}</td>
        <td>{item.currentQuantity}</td>
      </tr>
    ); 
  });
  return (
    <tbody>
      {receiptItems}
    </tbody>
  );
}


export default ReceiptList;
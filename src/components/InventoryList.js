import React from 'react';
import InventoryItem from './InventoryItem';

//import css
import '../styles/inventory.css';

const InventoryList = (props) => {
  const inventoryItems = props.inventory.map((item, index) => {
    return <InventoryItem key={index} item={item} />
  });

  return (
    <div>
      {props.inventory.length === 0 ? <h2>Nothing Found :(</h2> : null}
      <ul>{inventoryItems}</ul>
    </div>
  );
};

export default InventoryList;

 
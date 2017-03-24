import React from 'react';
import { browserHistory } from 'react-router';

const InventoryItem = (item) => {
  const productImage = 'http://rockbottomimages.com/ProductImages/random/NoImage2.jpg';
  return (
    <div className="col-xs-12">
      <div className={`card ${item.item.stock - item.item.committed < 3 && item.item.committed !== 0  ? 'card-lq' : ''}`}>
        <div className="card-image">
          <img src={(item.item.imgUrl === "") ? productImage : item.item.imgUrl} alt={item.item.description} />
        </div>
        <div className="card-info">
          <div className="name">
            <p><strong>{item.item.location}</strong> | {item.item.sku}</p>
          </div>
          <hr />
          <div className="content">
            <p>{item.item.upc}</p>
            <p>{item.item.description}</p>
          </div>
          <div>
            <button onClick={() => browserHistory.push(`view/${item.item.sku}`)}>View More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryItem;
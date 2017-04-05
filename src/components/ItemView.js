import React from 'react';
import { Link } from 'react-router';

const ItemView = (item) => {
  const productImage = 'http://rockbottomimages.com/ProductImages/random/NoImage2.jpg';
  if (!item.item) {
    console.log("nothing found")
    return (
      <div></div>
    );
  } else {
    return (
      <div className="col-xs-12">
        <div className="card">
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
          </div>
        </div>
      </div>
    );
  }
};


export default ItemView;
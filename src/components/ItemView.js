import React from 'react';
import { Link } from 'react-router';

import '../styles/item.css';

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
        <div className={`detail-card ${ item.item.caFlag.includes("absolute") ? 'abf-background' : item.item.caFlag.includes("recount") ? 'recount-background' : item.item.caFlag.toUpperCase() === "INLINE" ? 'inline-background' : 'okay-background'}`}>
          <div className="detail-image">
            <img src={(item.item.imgUrl === "") ? productImage : item.item.imgUrl} alt={item.item.description} />
          </div>
          <div className="detail-card-info">
            <h3>{item.item.sku}  {(item.item.blocked === "True") ? <span>!</span> : null}</h3>
            <p>{item.item.description}</p>
            { (item.item.parentSku) ? <p>Parent: <strong>{item.item.parentSku}</strong></p> : null }
            <p>UPC: <strong>{item.item.upc}</strong></p>
            <hr />
            <ul>
              <li>NS Stock: <strong>{item.item.stock}</strong></li>
              <li>NS Committed: <strong>{item.item.committed}</strong></li>
            </ul>
            <hr />
            <ul>
              <li>CA Total: <strong>{item.item.caTotal}</strong></li>
              <li>CA Available: <strong>{item.item.caAvailable}</strong></li>
              <li>CA Pending: <strong>{item.item.caPending}</strong></li>
            </ul>
            <hr />
            <h3>Location: <strong>{item.item.location}</strong> | {item.item.backstock}</h3>
            <p>Inline: <strong>{item.item.inline}</strong></p>
            <p>Notes/Flags: <strong>{item.item.caFlag}</strong></p>
          </div>
        </div>
      </div>
    );
  }
};


export default ItemView;
import React, { Component } from 'react';


//import style
import '../styles/item.css';

export default class ItemView extends Component {
  constructor(props) {
    super(props);
    this.setState = {
      productImage: 'http://rockbottomimages.com/ProductImages/random/NoImage2.jpg'
    }
  }

  render() { 
    if (!this.props.item) { 
      return (
        <div className="loading">
          <h2>Loading...</h2>
        </div>
      );
    } else {
      return (
        <div className="col-xs-12">
          <div className={`detail-card ${ this.props.item.caFlag.includes("absolute") ? 'abf-background' : this.props.item.caFlag.includes("recount") ? 'recount-background' : this.props.item.caFlag.toUpperCase() === "INLINE" ? 'inline-background' : 'okay-background'}`}>
            <div className="detail-image">
              <img src={(this.props.item.imgUrl === "") ? this.state.productImage : this.props.item.imgUrl} alt={this.props.item.description} />
            </div>
            <div className="detail-card-info">
              <h3>{this.props.item.sku}  {(this.props.item.blocked === "True") ? <span>!</span> : null}</h3>
              <p>{this.props.item.description}</p>
              { (this.props.item.parentSku) ? <p>Parent: <strong>{this.props.item.parentSku}</strong></p> : null }
              <p>UPC: <strong>{this.props.item.upc}</strong></p>
              <hr />
              <ul>
                <li>NS Stock: <strong>{this.props.item.stock}</strong></li>
                <li>NS Committed: <strong>{this.props.item.committed}</strong></li>
              </ul>
              <hr />
              <ul>
                <li>CA Total: <strong>{this.props.item.caTotal}</strong></li>
                <li>CA Available: <strong>{this.props.item.caAvailable}</strong></li>
                <li>CA Pending: <strong>{this.props.item.caPending}</strong></li>
              </ul>
              <hr />
              <h3>Location: <strong>{this.props.item.location}</strong> | {this.props.item.backstock}</h3>
              <p>Inline: <strong>{this.props.item.inline}</strong></p>
              <p>Notes/Flags: <strong>{this.props.item.caFlag}</strong></p>
            </div>
          </div>
        </div>
      );
    }

  }
}
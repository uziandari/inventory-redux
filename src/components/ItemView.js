import React, { Component } from 'react';


//import style
import '../styles/item.css';

export default class ItemView extends Component {
  render() {
    const { toggleLocations, toggleUpc, locationsVisible, parentsVisible, upcVisible, locHistory } = this.props;

    if (locHistory && (locationsVisible || parentsVisible)) {
      var historyNode = this.props.locHistory.map((history, index) => {
        return (
          <tr key={index}>
            { (parentsVisible) ? <td>{history.sku}</td> : null }
            <td>{history.submitDate}</td>
            <td>{history.field}</td>
            <td>{history.locationMoved}</td>
          </tr>
        );
      });
    } else if (locHistory && upcVisible) {
      var historyNode = this.props.locHistory.map((history, index) => {
        return (
          <tr key={index}>
            <td>{history.submitDate}</td>
            <td>{history.changeUpc}</td>
          </tr>
        );
      });
    }
  

    if (!this.props.item) { 
      return (
        <div className="loading">
          <h2>Loading...</h2>
        </div>
      );
    } else {
      return (
        <div>
          <div className="row">
            <div className="col-xs-12">
              <div className={`detail-card ${ this.props.item.caFlag.includes("absolute") ? 'abf-background' : this.props.item.caFlag.includes("recount") ? 'recount-background' : this.props.item.caFlag.toUpperCase() === "INLINE" ? 'inline-background' : 'okay-background'}`}>
                <div className="detail-image">
                  <img src={(this.props.item.imgUrl === "") ? this.props.productImage : this.props.item.imgUrl} alt={this.props.item.description} />
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
                  <div className="btn-group">
                    <button type="button" onClick={() => toggleUpc(this.props.item.sku)} className="btn btn-primary">View Previous UPCs</button>
                    <button type="button" onClick={() => toggleLocations(this.props.item.sku, "sku")} className="btn btn-primary">View Previous Locations</button>
                    { (this.props.item.parentSku) ? <button type="button" onClick={() => toggleLocations(this.props.item.parentSku, "parent_sku")} className="btn btn-primary">View Parent Locations</button> : null }  
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="history-table">
            <table className="table table-striped table-condensed">
              <tbody>
                {historyNode}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

  }
}
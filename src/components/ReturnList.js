import React, { Component } from 'react';
import firebase from 'firebase';

//style
import '../styles/returnCard.css';

export default class ReturnList extends Component {
 
 completeReturn(item) {
    let ref = firebase.database().ref(`returns/${item.key}`)
    ref.update({completedReturn: !item.completedReturn});
  }

  deleteReturn(item) {
    let confirmDelete = confirm(`Are you sure you want to delete ${item.orderNumber}?`)
    if (confirmDelete) {
      let ref = firebase.database().ref(`returns/${item.key}`)
      ref.remove();
    }
  }

  
   render() {

    var itemsNode = this.props.inventory.map((item, index) => {
      return (
        <li key={index} className={`return-item ${ item.completedReturn ? 'completed-return' : ''}`}>
          <div className="return-card">
            <div className="delete-return"><i className="fa fa-trash" aria-hidden="true" onClick={() => this.deleteReturn(item)}></i></div>
              <div className="return-info">  
                <h3>{item.orderNumber}</h3>
                <p>{item.trackingNumber}</p>
                <h6>{item.submitTime}</h6>
              </div>
            <div className="item-info">
              <p>{item.sku}</p>
              {item.doNotRestock ? <p><i className="fa fa-exclamation-circle fa-2x return-warning" aria-hidden="true"></i>{item.noRestockReason}-{item.returnCode}</p> : <div></div>}
              <hr />
              <p id="upc">{item.upc}</p>
              <button className="return-complete-button" onClick={() => this.completeReturn(item)}>Complete</button>
            </div>
          </div>
        </li>
      );
    }); 

    return (
      <ul className="returns-container">
        {itemsNode}
      </ul>
    );
  }

}


  

import React, { Component } from 'react';
import firebase from 'firebase';
import CopyToClipboard from 'react-copy-to-clipboard';

//style
import '../styles/locationsList.css';

export default class LocationsList extends Component {
 
  useLocation(item) {
    let ref = firebase.database().ref(`freeLocations/${item.key}`)
    ref.update({usedLocation: !item.usedLocation});

    Notification.requestPermission().then(function(result) {
      if (Notification.permission === "granted") {
        let notification = new Notification(`${item.location} Copied!`);
      }
    });
  }


  
   render() {

    var itemsNode = this.props.locations.map((item, index) => {
      return (
        <div key={index} className="location-item" onClick={() => this.useLocation(item)}>
          <CopyToClipboard text={item.location}>
            <div className={`location-card ${item.usedLocation ? 'used': null}`}>
              <div className="text">{item.location}</div>
              <div className="text">Size: {item.binSize}</div>
            </div>
          </CopyToClipboard>
        </div>
      );
    }); 

    return (
      <div id="locations-wrapper">
        {itemsNode}
      </div>
    );
  }

}


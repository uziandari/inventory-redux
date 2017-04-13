import React, { Component } from 'react';

import '../styles/userHome.css';

export default class UserHome extends Component {
  
  render() {
    return (
      <div id="user-home">
        <h1>What's New</h1>
        <div className="update-list">
          <h3>-4/13/2017-</h3>
          <ul>
            <li>Location history added to item detail page.</li>
            <li>Parent history added to item detail page.</li>
          </ul>
          <h3>-4/10/2017-</h3>
          <ul>
            <li>Added item detail page.</li>
          </ul>
           <h3>-4/7/2017-</h3>
          <ul>
            <li>Adjustments now reflect proper date.</li>
            <li>Free location search should be more accurate.</li>
          </ul>
          <h3>-3/17/2017-</h3>
          <ul>
            <li>Users can now download a returns csv from the returns view.</li>
            <li>Slight UI change to the adjustments searchbox.</li>
          </ul>
          <h3>-3/16/2017-</h3>
          <ul>
            <li>Added adjustments search (admin only).</li>
            <li>Fixed search field selection.</li>
          </ul>
          <h3>-3/14/2017-</h3>
          <ul>
            <li>Clicking a location card now copies that location to the clipboard.</li>
          </ul>
          <h3>-3/13/2017-</h3>
          <ul>
            <li>Inventory search now has categories.</li>
            <li>Free locations no longer disappear when selected. Users can toggle between used/non-used.</li>
            <li>Returns submission form added.</li>
            <li>Returns View added.</li>
            <li>General UI improvements.</li>
          </ul>      
        </div>
      </div>
    );
  }
}

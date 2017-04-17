import React, { Component } from 'react';

//import style
import '../styles/searchbar.css';

export default class LocationSearch extends Component {
  //input search function
  onInputChange(term) {
    this.props.onTermChange(term, this.props.field.locationField);
  }

  fieldChange(locationField) {
    this.props.onFieldChange(locationField);
  }

  componentWillUnmount() {
    this.fieldChange('location');
  }
  
  render() {
    return (
      <div className="location-search">
        <select className="form-control location-field-selector" name="locationField" value={this.props.locationField} onChange={event => this.fieldChange(event.target.value)}>
            <option value="location">Location</option>      
            <option value="bin_size">Size</option>          
        </select>
        <input className="location-search-input" placeholder="Search..." onChange={event => this.onInputChange(event.target.value)} />  
      </div>
    );
  }
}


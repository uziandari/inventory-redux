import React, { Component } from 'react';

//import style
import '../styles/searchbar.css';

export default class SearchBar extends Component {
  //input search function
  onInputChange(term) {
    this.props.onTermChange(term, this.props.field.searchField);
  }

  fieldChange(searchField) {
    this.props.onFieldChange(searchField);
  }

  render() {
    return (
      <div className="search">
        <select className="form-control search-selector" name="searchField" value={this.props.searchField} onChange={event => this.fieldChange(event.target.value)}>
            <option></option>
            <option value="upc">UPC</option>
            <option value="sku">SKU</option>
            <option value="location">Location</option>
            <option value="parent_sku">Parent SKU</option>
        </select>
        <input className="inventory-search-input" placeholder="Search..." onChange={event => this.onInputChange(event.target.value)} />
        
      </div>
    );
  }
}


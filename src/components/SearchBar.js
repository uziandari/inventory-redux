import React, { Component } from 'react';

//import style
import '../styles/searchbar.css';

export default class SearchBar extends Component {
  //input search function
  onInputChange(term) { 
    this.props.onTermChange(term, this.props.field);
  }

  fieldChange(searchField) {
    this.props.onFieldChange(searchField);
  }

  componentWillUnmount() {
    this.fieldChange('upc');
  }

  render() {
    const fieldArray = this.props.fields.map((item, index) => {
      return (<option key={index} value={item.value}>{item.label}</option>);
    });

    return (
      <div className="search">
        <select className="form-control search-selector" name="searchField" value={this.props.searchField} onChange={event => this.fieldChange(event.target.value)}>
            {fieldArray}
        </select>
        <input className="inventory-search-input" placeholder="Search..." onChange={event => this.onInputChange(event.target.value)} />       
      </div>
    );
  }
}


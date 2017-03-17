import React, { Component } from 'react';

//import style
import '../styles/searchbar.css';

export default class AdjustmentSearch extends Component {
  
  onInputChange(term) {
    this.props.onTermChange(term)
  }

  render() {
    return (
      <div className="adjustment-search">
        <input className="adjustment-search-input" placeholder="Search SKU..." onChange={event => this.onInputChange(event.target.value)} />  
      </div>
    );
  }
}


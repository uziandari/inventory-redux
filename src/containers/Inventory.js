import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import SearchBar from '../components/SearchBar';
import InventoryList from '../components/InventoryList';


class Inventory extends React.Component {
  render() {
    return (
      <div id="inventory-section">
        <h1>Inventory</h1>
        <SearchBar onTermChange={this.props.actions.searchInventory} 
                   onFieldChange={this.props.actions.changeSearchField}
                   field={this.props.searchField} />
        <InventoryList inventory={this.props.inventory} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    inventory: state.inventory.data,
    searchField: state.searchField
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
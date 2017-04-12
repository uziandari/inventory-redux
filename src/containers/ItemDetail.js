import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import { Link } from 'react-router';

//item component
import ItemView from '../components/ItemView';
import Inventory from './Inventory';

class ItemDetail extends Component {

  componentDidMount() {
    this.props.actions.itemInventory(this.props.params.id)
  }

  toggleLocationsView(sku) {
    this.props.actions.findLocationHistory(sku);
  }
  
  toggleParentLocations(parent) {
    console.log(parent);
  }

  render() {
    return (
      <div id="item-detail-section">
        <div className="go-back">
          <Link to='/inventory' className="detail-link second after">Go Back</Link>
        </div>
        <ItemView item={this.props.inventory} toggleLocations={this.toggleLocationsView.bind(this)} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  if (state.item.data.length === 0) {
    return {};
  } else {
    return {
      inventory: state.item.data[0],
      locHistory: state.item.locationHistory
    };
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);


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
    this.props.actions.itemInventory(this.props.params.id);
  }

  toggleLocationsView(sku, skuField) {
    this.props.actions.findLocationHistory(sku, skuField);
  }

  toggleUpcView(sku) {
    this.props.actions.findUpcHistory(sku);
  }

  toggleReceiptView(sku) {
    this.props.actions.findReceiptHistory(sku);
  }

  render() {
    return (
      <div id="item-detail-section">
        <div className="go-back">
          <Link to='/inventory' className="detail-link second after">Go Back</Link>
        </div>
        <ItemView item={this.props.inventory} locHistory={this.props.locHistory} 
                  toggleLocations={this.toggleLocationsView.bind(this)} 
                  toggleUpc={this.toggleUpcView.bind(this)}
                  toggleReceipts={this.toggleReceiptView.bind(this)} 
                  upcVisible={this.props.upcVisible} 
                  locationsVisible={this.props.locationsVisible} 
                  parentsVisible={this.props.parentsVisible} 
                  receiptVisible={this.props.receiptVisible} />
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
      locHistory: state.item.locationHistory,
      locationsVisible: state.item.locationsVisible,
      parentsVisible: state.item.parentsVisible,
      upcVisible: state.item.upcVisible,
      receiptVisible: state.item.receiptVisible
    };
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);


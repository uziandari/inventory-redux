import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import { Link } from 'react-router';

//component
import ReceiptView from '../components/ReceiptView';

class Receipts extends Component {

  componentDidMount() {
    this.props.actions.receiptInventory(this.props.params.id);
  }


  render() {
    return (
      <div id="receipt-section">
        <ReceiptView receipts={this.props.receipts} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    receipts: state.receipt.receipts,    
  };  
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Receipts);


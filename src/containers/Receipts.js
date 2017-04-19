import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import ReceiptList from '../components/ReceiptList';

//style
import '../styles/adjustments.css';

class Receipts extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <table className="table table-hover table-condensed adj-table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Description</th>
              <th>Quantity Received</th>
              <th>Current Locations</th>
              <th>Current Backstock</th>
              <th>Current Quantity</th>
            </tr>
          </thead>
          <ReceiptList receipts={this.props.receipts} />
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    receipts: state.receipt.receipts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Receipts);



import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import ReceiptList from '../components/ReceiptList';

class Receipts extends React.Component {
  
  render() {
    return (
      <div>
        <table className="table table-hover table-condensed">
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
          {this.props.receipts.length}
          
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



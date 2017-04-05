import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import { Link } from 'react-router';

//item component
import ItemView from '../components/ItemView';
import Inventory from './Inventory';

class ItemDetail extends Component {

  componentWillMount() {
    this.props.actions.itemInventory(this.props.params.id)
  }

  render() {
    return (
      <div id="item-detail-section">
        <div className="go-back">
          <Link to='/inventory'>Go Back</Link>
        </div>
        <ItemView item={this.props.inventory} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state.item.data)
  if (state.item.data.length === 0) {
    return {};
  } else {
    return {
      inventory: state.item.data[0]
    };
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);


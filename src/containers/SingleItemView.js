import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import ItemView from '../components/ItemView';

class SingleItemView extends React.Component {

  componentWillMount() {
    this.props.actions.loadItem(this.props.params.id)
  }


  render() {
    return (
      <div id="inventory-section">
        <ItemView item={this.props.item} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    item: state.item.data[0]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleItemView);
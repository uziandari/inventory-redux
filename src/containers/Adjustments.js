import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import AdjustmentSearch from '../components/AdjustmentSearch';
import AdjustmentsList from '../components/AdjustmentsList';

//style
import '../styles/adjustments.css';

class Adjustments extends React.Component {
  render() {
    return (
      <div id="adjustment-section">
        <h1>Adjustments</h1>
        <AdjustmentSearch onTermChange={this.props.actions.searchAdjustments} />
        <AdjustmentsList adjustments={this.props.adjustments} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
    adjustments: state.adjustments.data,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Adjustments);
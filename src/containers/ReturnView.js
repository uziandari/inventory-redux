import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import ReturnList from '../components/ReturnList';
import { CSVLink } from 'react-csv';

class ReturnView extends React.Component {

  componentDidMount() {
    this.props.actions.viewReturns();
  }

  toggleCompleted() {
    this.props.actions.viewReturns(true);
  }

  render() {
    
    return (
      <div id="view-returns">
        <h1>View Returns</h1>
        <div className="download">
          <CSVLink data={this.props.returns} filename={"returns.csv"}
              target="_blank"
              className="download-button">
            Download
          </CSVLink>
        </div>
       
        <ReturnList inventory={this.props.returns} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    returns: state.returnView.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReturnView);
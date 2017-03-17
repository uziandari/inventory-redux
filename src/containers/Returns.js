import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initialize } from 'redux-form';
import ReturnForm from '../components/ReturnForm';
import ReturnModal from '../components/ReturnModal';
import * as Actions from '../actions';


class Returns extends Component {

  componentWillMount() {
    this.props.dispatch(initialize('return', {
      returnCode: 'RAVR'
    }))
  }

  handleSubmit(data) {
    console.log('Submission received!', data);
    this.props.addReturn(data);
    this.props.dispatch(initialize('return', {})); // clear form
  }

  selectItem(items, itemIndex) {
    this.props.addSelectedItem(items, itemIndex, this.props.inputtedValues);
    this.props.closeModal();
  }

  render() {
    return (
      <div id="return-form-section">
        <ReturnForm onSubmit={this.handleSubmit.bind(this)}/>
        <ReturnModal modalIsOpen={ this.props.modalIsOpen }
                     items={ this.props.items }
                     onRequestClose={ () => this.props.closeModal() } 
                     selectedItem={ (item) => this.selectItem(this.props.items, item) } />
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    return: state.return,
    modalIsOpen: state.modal.modalIsOpen,
    items: state.modal.items,
    inputtedValues: state.modal.inputtedValues
  }
}

export default connect(mapStateToProps, Actions)(Returns);
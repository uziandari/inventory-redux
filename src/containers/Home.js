import React, { Component } from 'react';
import Login from './Login';

//import redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

//import style
import '../styles/app.css';


class Home extends Component {
  render() {
    return (
      <div className="login-title">
        <h1>Welcome.</h1>
        <h2>Please login.</h2>
        <Login />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);


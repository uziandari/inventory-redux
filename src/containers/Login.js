import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as Actions from '../actions';

import '../styles/login.css';

const validate = values => {
  const errors = {};

  if  (!values.email) {
    errors.email = "Please enter an email.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = "Please enter a password.";
  }

  return errors;
};

class Login extends Component {
  handleFormSubmit = (values) => {
    this.props.signInUser(values);
  };

  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <fieldset className={`formgroup ${touched && error ? 'has-error' : ''}`}>
      <div>
        <input {...input} placeholder={label} className="form-login" type={type} />
        {touched && error && <div className="help-block">{error}</div>}
      </div>
    </fieldset>
  );
  
  renderAuthenticationError() {
    if (this.props.authenticationError) {
      return <div className="alert alert-danger">{ this.props.authenticationError }</div>;
    }
    return <div></div>;
  }

  render() {
    return (
       <div className="login-container">
        <div className="login-form">
          {this.renderAuthenticationError()}
          <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
            <Field name="email" component={this.renderField} className="form-control" type="text" label="Email"/>
            <Field name="password" component={this.renderField} className="form-control" type="password" label="Password"/>

            <button action="submit" className="btn-login btn-login-large">Log In</button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticationError: state.auth.error
  }
}

export default connect(mapStateToProps, Actions)(reduxForm({
  form: 'login',
  validate
})(Login));
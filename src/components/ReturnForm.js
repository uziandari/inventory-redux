import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import validate from '../utils/validate';
//import style
import '../styles/returns.css'

const selector = formValueSelector('return')

const renderRequiredField = ({ input, label, type, meta: { touched, error } }) => (
  <fieldset className={`formgroup ${touched && error ? 'has-error' : ''}`}>
    <div>
      <label className="control-label">{label}</label>
    </div>
    <div className="col-sm-6">
      <input {...input} placeholder={label} className="form-control" type={type} />
      {touched && error && <div className="help-block">{error}</div>}
    </div>
  </fieldset>
);

const renderOptionalField = ({ input, label, type, id }) => (
  <fieldset className="formgroup">
    <div>
      <label className="control-label">{label}</label>
    </div>
    <div className="col-sm-6">
      <input {...input} placeholder={label} className="form-control" type={type} />
    </div>
  </fieldset>
);

const renderSwitchField = ({ input, label, type, id }) => (
  <fieldset className="formgroup">
    <div>
      <label className="control-label">{label}</label>
    </div>
    <div>
      <input {...input} placeholder={label} className="checkbox-inline" type={type} />
    </div>
  </fieldset>
);

class ReturnForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting, hasElectronicSerial, doNotRestock } = this.props
    
    return (
      <container id="return-section">
        <h1>Add Returns</h1>
        <form onSubmit={handleSubmit} className="return-form">
          <Field name="trackingNumber" component={renderRequiredField} type="text" label="Tracking Number"/>
          <Field name="orderNumber" component={renderRequiredField} type="text" label="Order Number"/>
          <Field name="upc" component={renderRequiredField} type="text" label="UPC"/>
          
          <div className="formgroup">
            <label className="control-label">Return Code</label>
            <div>
              <Field name="returnCode" className="select-field" component="select">
                <option value="RAVR">RAVR</option>
                <option value="RADE">RADE</option>
                <option value="RAIR">RAIR</option>
                <option value="Unknown">Unknown</option>
              </Field>
            </div>
          </div>
          

          <Field name="hasElectronicSerial" id="hasElectronicSerial" component={renderSwitchField} type="checkbox" label="Electronic Return" />
          {hasElectronicSerial && <div>
              <Field name="electronicSerial" component={renderOptionalField} type="text" label="Serial"/>
          </div>}
          <Field name="doNotRestock" id="doNotRestock" component={renderSwitchField} type="checkbox" label="Do Not Restock" />
          {doNotRestock && <div>
            <Field name="noRestockReason" className="select-field" component="select">
              <option value="">Select Reason</option>
              <option value="Defective Item">Defective Item</option>
              <option value="Used Item">Used Item</option>
              <option value="Electronics Return">Electronics Return</option>
              <option value="Other">Other</option>
            </Field>
          </div>}  
          <Field name="additionalNotes" id="additionalNotes" component={renderOptionalField} type="text" label="Notes" />
          
          <button type="button" onClick={handleSubmit} className="btn btn-primary return-button" disabled={pristine || submitting}>Add Return</button>
          <button type="button" className="btn btn-warning return-button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
        </form>
      </container>
    );
  }
}

ReturnForm = reduxForm({
  form: 'return',     // a unique identifier for this form
  validate
})(ReturnForm)

ReturnForm = connect(
  state => {
    // can select values individually
    const hasElectronicSerial = selector(state, 'hasElectronicSerial');
    const doNotRestock = selector(state, 'doNotRestock');
    return {
      hasElectronicSerial,
      doNotRestock
    }
  }
)(ReturnForm)


export default ReturnForm;

const validate = values => {
  const errors = {};

  if  (!values.trackingNumber) {
    errors.trackingNumber = "Please enter a tracking number.";
  } 

  if (!values.orderNumber) {
    errors.orderNumber = "Please enter an order number.";
  }

  return errors;
};

export default validate;
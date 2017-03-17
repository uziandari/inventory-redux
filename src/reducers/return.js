import { RETURN_SUCCESSFUL, RETURN_REJECTED} from '../actions';

const initialState = {
  trackingNumber: null,
  orderNumber: null,
  returnCode: 'RAVR',
  electronicSerial: null,
  toRestock: true,
  noRestockReason: null,
  additionalNotes: null,
  upc: null,
  sku: null,
  description: null
};

export default function submitReturn(state = initialState, action) {
  switch (action.type) {
    case RETURN_SUCCESSFUL:
      console.log('successful return.')
      return {
        state,
        error: null
      }
    case RETURN_REJECTED:
      console.log('successful return.')
      return {
        ...state,
        error: action.payload.message
      }
    default:
      return state;
  }
};
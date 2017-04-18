import { RECEIPT_LOOKUP_FULFILLED } from '../actions';

const initialState = {
  receipts: []
};

export default function searchInventory(state = initialState, action) {
  switch (action.type) {
    case RECEIPT_LOOKUP_FULFILLED:
      return {
        ...state,
        receipts: action.payload
      }
    default:
      return state;
  }
};

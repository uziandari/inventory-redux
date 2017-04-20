import { RECEIPT_LOOKUP_FULFILLED, RECEIPT_VISIBLE } from '../actions';

const initialState = {
  receipts: [],
  isVisible: false
};

export default function searchInventory(state = initialState, action) {
  switch (action.type) {
    case RECEIPT_LOOKUP_FULFILLED:
      return {
        ...state,
        receipts: action.payload,
      }
    case RECEIPT_VISIBLE:
      return {
        ...state,
        isVisible: !state.isVisible
      }
    default:
      return state;
  }
};

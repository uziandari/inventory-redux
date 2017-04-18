import { ITEM_INVENTORY_FULFILLED, LOCATION_HISTORY_FULFILLED, PARENT_HISTORY_FULFILLED, PRODUCTCODE_HISTORY_FULFILLED, RECEIPT_HISTORY_FULFILLED } from '../actions';

const initialState = {
  data: [],
  productImage: null,
  locationsVisible: false,
  parentsVisible: false,
  upcVisible: false,
  receiptVisible: false
};

export default function ItemInventory(state = initialState, action) {
  switch (action.type) {
    case ITEM_INVENTORY_FULFILLED:
      return {
        ...state,
        data: action.payload,
        productImage: 'http://rockbottomimages.com/ProductImages/random/NoImage2.jpg',
        locationsVisible: false,
        parentsVisible: false,
        upcVisible: false,
        receiptVisible: false
      }
    case LOCATION_HISTORY_FULFILLED:
      return {
        ...state,
        locationHistory: action.payload,
        locationsVisible: !state.locationsVisible,
        parentsVisible: false,
        upcVisible: false,
        receiptVisible: false
      }
    case PARENT_HISTORY_FULFILLED:
      return {
        ...state,
        locationHistory: action.payload,
        locationsVisible: false,
        upcVisible: false,
        receiptVisible: false,
        parentsVisible: !state.parentsVisible
      }
    case PRODUCTCODE_HISTORY_FULFILLED:
      return {
        ...state,
        locationHistory: action.payload,
        upcVisible: !state.upcVisible,
        locationsVisible: false,
        receiptVisible: false,
        parentsVisible: false
      }
    case RECEIPT_HISTORY_FULFILLED:
      return {
        ...state,
        locationHistory: action.payload,
        upcVisible: false,
        locationsVisible: false,
        parentsVisible: false,
        receiptVisible: !state.receiptVisible
      }
    default:
      return state;
  }
};

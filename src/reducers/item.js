import { ITEM_INVENTORY_FULFILLED, LOCATION_HISTORY_FULFILLED, PARENT_HISTORY_FULFILLED, 
        PRODUCTCODE_HISTORY_FULFILLED, RECEIPT_HISTORY_FULFILLED, 
        RECEIPT_DOCUMENT_FULFILLED, RECEIPT_DOCUMENT_VISIBLE, RECEIPT_DOCUMENT_TOGGLE } from '../actions';

const initialState = {
  data: [],
  productImage: null,
  locationsVisible: false,
  parentsVisible: false,
  upcVisible: false,
  receiptVisible: false,
  receiptDocumentVisible: false,
  receiptNum: 1
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
        receiptVisible: false,
        receiptDocumentVisible: false
      }
    case LOCATION_HISTORY_FULFILLED:
      return {
        ...state,
        locationHistory: action.payload,
        locationsVisible: !state.locationsVisible,
        parentsVisible: false,
        upcVisible: false,
        receiptVisible: false,
        receiptDocumentVisible: false
      }
    case PARENT_HISTORY_FULFILLED:
      return {
        ...state,
        locationHistory: action.payload,
        locationsVisible: false,
        upcVisible: false,
        receiptVisible: false,
        receiptDocumentVisible: false,
        parentsVisible: !state.parentsVisible
      }
    case PRODUCTCODE_HISTORY_FULFILLED:
      return {
        ...state,
        locationHistory: action.payload,
        upcVisible: !state.upcVisible,
        locationsVisible: false,
        receiptVisible: false,
        receiptDocumentVisible: false,  
        parentsVisible: false
      }
    case RECEIPT_HISTORY_FULFILLED:
      return {
        ...state,
        receiptVisible: !state.receiptVisible,
        locationHistory: action.payload,
        upcVisible: false,
        locationsVisible: false,
        parentsVisible: false,
        receiptDocumentVisible: false
      }
    case RECEIPT_DOCUMENT_FULFILLED:
      return {
        ...state,
        receiptHistory: action.payload,
        upcVisible: false,
        locationsVisible: false,
        parentsVisible: false,
        receiptVisible: true,
      }
    case RECEIPT_DOCUMENT_VISIBLE:
      return {
        ...state,
        upcVisible: false,
        locationsVisible: false,
        parentsVisible: false,
        receiptVisible: true,
        receiptDocumentVisible: !state.receiptDocumentVisible
      }
    case RECEIPT_DOCUMENT_TOGGLE:
    console.log(action.payload)
      return {
        ...state,
        upcVisible: false,
        locationsVisible: false,
        parentsVisible: false,
        receiptVisible: true,
        receiptDocumentVisible: true,
        receiptNum: action.payload
      }
    default:
      return state;
  }
};

import { ITEM_INVENTORY_FULFILLED, LOCATION_HISTORY_FULFILLED, PARENT_HISTORY_FULFILLED } from '../actions';

const initialState = {
  data: [],
  productImage: null,
  locationsVisible: false,
  parentsVisible: false
};

export default function ItemInventory(state = initialState, action) {
  switch (action.type) {
    case ITEM_INVENTORY_FULFILLED:
      return {
        ...state,
        data: action.payload,
        productImage: 'http://rockbottomimages.com/ProductImages/random/NoImage2.jpg',
        locationsVisible: false,
        parentsVisible: false
      }
    case LOCATION_HISTORY_FULFILLED:
      return {
        ...state,
        locationHistory: action.payload,
        locationsVisible: !state.locationsVisible,
        parentsVisible: false
      }
    case PARENT_HISTORY_FULFILLED:
      return {
        ...state,
        locationHistory: action.payload,
        locationsVisible: false,
        parentsVisible: !state.parentsVisible
      }
    default:
      return state;
  }
};

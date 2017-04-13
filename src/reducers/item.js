import { ITEM_INVENTORY_FULFILLED, LOCATION_HISTORY_FULFILLED } from '../actions';

const initialState = {
  data: [],
  productImage: null,
  locationsVisible: false
};

export default function ItemInventory(state = initialState, action) {
  switch (action.type) {
    case ITEM_INVENTORY_FULFILLED:
      return {
        ...state,
        data: action.payload,
        productImage: 'http://rockbottomimages.com/ProductImages/random/NoImage2.jpg',
        locationsVisible: false
      }
    case LOCATION_HISTORY_FULFILLED:
      return {
        ...state,
        locationHistory: action.payload,
        locationsVisible: !state.locationsVisible
      }
    default:
      return state;
  }
};

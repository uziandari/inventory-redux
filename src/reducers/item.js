import { ITEM_INVENTORY_FULFILLED, LOCATION_HISTORY_FULFILLED } from '../actions';

const initialState = {
  data: [],
  productImage: null,
  toggleLocationsView: false,
  toggleParentView: false
};

export default function ItemInventory(state = initialState, action) {
  switch (action.type) {
    case ITEM_INVENTORY_FULFILLED:
      return {
        ...state,
        data: action.payload,
        productImage: 'http://rockbottomimages.com/ProductImages/random/NoImage2.jpg'
      }
    case LOCATION_HISTORY_FULFILLED:
      return {
        ...state,
        locationHistory: action.payload
      }
    default:
      return state;
  }
};

import { ITEM_INVENTORY_FULFILLED } from '../actions';

const initialState = {
  data: []
};

export default function ItemInventory(state = initialState, action) {
  switch (action.type) {
    case ITEM_INVENTORY_FULFILLED:
      return {
        ...state,
        data: action.payload
      }
    default:
      return state;
  }
};

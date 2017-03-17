import { SEARCH_INVENTORY_FULFILLED } from '../actions';

const initialState = {
  data: []
};

export default function searchInventory(state = initialState, action) {
  switch (action.type) {
    case SEARCH_INVENTORY_FULFILLED:
      return {
        ...state,
        data: action.payload
      }
    default:
      return state;
  }
};

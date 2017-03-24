import { SEARCH_ITEM_FULFILLED } from '../actions';

const initialState = {
  data: []
};

export default function searchItme(state = initialState, action) {
  switch (action.type) {
    case SEARCH_ITEM_FULFILLED:
      return {
        ...state,
        data: action.payload
      }
    default:
      return state;
  }
};

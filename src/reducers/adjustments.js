import { SEARCH_ADJUSTMENTS_FULFILLED } from '../actions';

const initialState = {
  data: []
};

export default function searchAdjustments(state = initialState, action) {
  switch (action.type) {
    case SEARCH_ADJUSTMENTS_FULFILLED:
      return {
        ...state,
        data: action.payload
      }
    default:
      return state;
  }
};

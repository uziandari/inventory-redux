import { SEARCH_LOCATIONS_FULFILLED } from '../actions';

const initialState = {
  data: []
};

export default function searchLocations(state = initialState, action) {
  switch (action.type) {
    case SEARCH_LOCATIONS_FULFILLED:
      return {
        ...state,
        data: action.payload
      }
    default:
      return state;
  }
};

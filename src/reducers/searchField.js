import { CHANGE_FIELD } from '../actions';

const initialState = {
  searchField: 'upc'
};

export default function changeField(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FIELD:
      return {
        ...state,
        searchField: action.payload
      };
    default:
      return state;
  }
};
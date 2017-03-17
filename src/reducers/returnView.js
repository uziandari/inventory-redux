import { VIEW_RETURNS } from '../actions';

const initialState = {
  data: []
};

export default function viewReturnList(state = initialState, action) {
  switch (action.type) {
    case VIEW_RETURNS:
      return {
        ...state,
        data: action.payload
      }
    default:
      return state;
  }
};

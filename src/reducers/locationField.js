import { CHANGE_LOCATION_FIELD } from '../actions';

const initialState = {
  locationField: 'location'
};

export default function changeLocationField(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOCATION_FIELD:
      return {
        ...state,
        locationField: action.payload
      };
    default:
      return state;
  }
};
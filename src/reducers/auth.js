import {SIGN_OUT_USER, AUTH_USER, AUTH_ERROR } from '../actions';

const initialState = {
  authenticated: false
};

export default function authenticateUser(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: true,
        admin: action.payload,
        error: null
      };
    case SIGN_OUT_USER:
      return {
        ...state,
        authenticated: false,
        error: null
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload.message
      };
    default:
      return state;
  }
};
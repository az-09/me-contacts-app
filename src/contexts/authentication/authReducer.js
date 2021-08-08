import {
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_USER,
} from "./authActions";

import authInitialState from "./authInitialState";

const authReducer = (state, { type, payload }) => {
  switch (type) {
    case REGISTER_LOADING:
    case LOGIN_LOADING:
      return {
        ...state,
        error: false,
        loading: true,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
      };

    case REGISTER_ERROR:
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case LOGOUT_USER:
      return {
        ...authInitialState,
      };
    default:
      return state;
  }
};

export default authReducer;

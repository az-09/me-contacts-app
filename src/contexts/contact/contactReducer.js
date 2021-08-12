import {
  CLEAR_CREATE_CONTACT,
  CREATE_CONTACT_ERROR,
  CREATE_CONTACT_LOADING,
  CREATE_CONTACT_SUCCESS,
} from "./contactActions";
import contactInitialState from "./contactInitialState";

const contactReducer = (state, { type, payload }) => {
  switch (type) {
    case CREATE_CONTACT_LOADING: {
      return {
        ...state,
        error: false,
        loading: true,
      };
    }

    case CREATE_CONTACT_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: payload,
      };
    }

    case CREATE_CONTACT_ERROR: {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    }

    case CLEAR_CREATE_CONTACT:{
      return{
        ...contactInitialState
      }
    }

    default:
      return state;
  }
};

export default contactReducer;

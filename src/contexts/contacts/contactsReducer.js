import {
  ADD_CONTACT_ERROR,
  ADD_CONTACT_LOADING,
  ADD_CONTACT_SUCCESS,
  DELETE_CONTACT_ERROR,
  DELETE_CONTACT_LOADING,
  DELETE_CONTACT_SUCCESS,
  GET_CONTACTS_ERROR,
  GET_CONTACTS_LOADING,
  GET_CONTACTS_SUCCESS,
  UPDATE_CONTACT_ERROR,
  UPDATE_CONTACT_LOADING,
  UPDATE_CONTACT_SUCCESS,
} from "./contactsActions";

const contactsReducer = (state, { type, payload }) => {
  switch (type) {
    case GET_CONTACTS_LOADING:
    case ADD_CONTACT_LOADING:
    case DELETE_CONTACT_LOADING:
    case UPDATE_CONTACT_LOADING:
      return {
        ...state,
        error: false,
        loading: true,
      };

    case GET_CONTACTS_SUCCESS:
    case ADD_CONTACT_SUCCESS:
    case DELETE_CONTACT_SUCCESS:
    case UPDATE_CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
      };

    case GET_CONTACTS_ERROR:
    case ADD_CONTACT_ERROR:
    case DELETE_CONTACT_ERROR:
    case UPDATE_CONTACT_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default contactsReducer
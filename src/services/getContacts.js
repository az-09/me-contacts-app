import { CONNECTION_ERROR } from "../contexts/authentication/authActions";
import {
    GET_CONTACTS_ERROR,
  GET_CONTACTS_LOADING,
  GET_CONTACTS_SUCCESS,
} from "../contexts/contacts/contactsActions";
import axiosHelper from "../utils/helpers/axiosHelper";

const getContacts = (history) => (dispatch) => {
  dispatch({
    type: GET_CONTACTS_LOADING,
  });

  axiosHelper(history)
    .get("/contacts/")
    .then((res) => {
      dispatch({
        type: GET_CONTACTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
        dispatch({
            type: GET_CONTACTS_ERROR,
            payload: err.response ? err.response.data : CONNECTION_ERROR
        })
    })
};

export default getContacts;

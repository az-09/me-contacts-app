import { CONNECTION_ERROR } from "../contexts/authentication/authActions";
import { CREATE_CONTACT_LOADING, CREATE_CONTACT_SUCCESS } from "../contexts/contact/contactActions";

import { axiosHelper } from "../utils/helpers/axiosHelper";

const createContact = (form) => (dispatch) => {
  const {
    lastName: last_name,
    firstName: first_name,
    phoneNumber: phone_number,
    countryCode: country_code,
    pictureURL: picture_url,
    isFavorite: is_favorite,
  } = form;

  dispatch({
    type: CREATE_CONTACT_LOADING,
  });

  axiosHelper()
    .post("/contacts/", {
      last_name,
      first_name,
      phone_number,
      country_code,
      picture_url,
      is_favorite,
    })
    .then((res) => {
      dispatch({
        type: CREATE_CONTACT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: CREATE_CONTACT_SUCCESS,
        payload: err.response ? err.response.data : CONNECTION_ERROR,
      });
    });
};

export default createContact;

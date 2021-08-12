import { CONNECTION_ERROR } from "../contexts/authentication/authActions";
import {
  CREATE_CONTACT_LOADING,
  CREATE_CONTACT_SUCCESS,
} from "../contexts/contact/contactActions";

import axiosHelper from "../utils/helpers/axiosHelper";
import storage from "../utils/helpers/firebaseHelper";

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

  const saveToBackend = (url = null) =>
    axiosHelper()
      .post("/contacts/", {
        last_name,
        first_name,
        phone_number,
        country_code,
        picture_url: url,
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

  if (picture_url) {
    // if picture_url exists needs to upload to firebase first
    storage
      .ref(`contact_image/${picture_url.name}`)
      .put(picture_url)
      .on(
        "state_changed",
        // must add snapshot and error, if not creating 3 contacts
        (snapshot) => {}, // if does not exist, keep loading wheel
        async (error) => {}, /// if does not exist, keep loading wheel
        async () => {
          const url = await storage
            .ref("contact_image")
            .child(picture_url.name)
            .getDownloadURL();
          saveToBackend(url);
        }
      );
  } else {
    saveToBackend();
  }
};

export default createContact;

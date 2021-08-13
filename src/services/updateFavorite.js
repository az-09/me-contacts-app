import { CONNECTION_ERROR } from '../contexts/authentication/authActions';
import { UPDATE_FAVORITE_ERROR, UPDATE_FAVORITE_LOADING, UPDATE_FAVORITE_SUCCESS } from '../contexts/contacts/contactsActions';
import axiosHelper from "../utils/helpers/axiosHelper";

const updateFavorite = (id, is_favorite) => (dispatch) => {
  dispatch({
    type: UPDATE_FAVORITE_LOADING,
  });

  axiosHelper()
    .patch(`/contacts/${id}`, { is_favorite })
    .then((res) => {
      dispatch({
        type: UPDATE_FAVORITE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_FAVORITE_ERROR,
        payload: err.response ? err.response.data : CONNECTION_ERROR,
      });
    });
};

export default updateFavorite
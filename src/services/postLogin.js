import {
  CONNECTION_ERROR,
  LOGIN_ERROR,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
} from "../contexts/authentication/authActions";
import axiosHelper from "../utils/helpers/axiosHelper";

const postLogin =
  ({ username, password }) =>
  (dispatch) => {
    dispatch({
      type: LOGIN_LOADING,
    });

    axiosHelper()
      .post("/auth/login", { username, password })
      .then((res) => {
        localStorage.token = res.data.token;
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_ERROR,
          payload: err.response ? err.response.data : CONNECTION_ERROR,
        });
      });
  };

export default postLogin;

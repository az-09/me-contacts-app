import { LOGOUT_USER } from "../contexts/authentication/authActions";

const logout = (history) => (dispatch) => {
  localStorage.removeItem('token');  
  dispatch({
    type: LOGOUT_USER,
  });
  history.push('/auth/login');
  
};

export default logout;

import axios from 'axios';

const axiosHelper =  (history = null) => {
  const baseURL = process.env.REACT_APP_BACKEND_URL;
  const headers = {};

  if (localStorage.token) {
    headers.Authorization = `Bearer ${localStorage.token}`;
  }

  const axiosHelper = axios.create({
    baseURL,
    headers,
  });

  axiosHelper.interceptors.response.use(
    (response) => new Promise((resolve) => {
      resolve(response);
    }),
    (error) => {
      // when error is not from server
      if (!error.response) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }

      if (error.response.status === 403) {
        localStorage.removeItem('token');
        if (history) {
          history.push('/auth/login');
        } else {
          window.location = '/auth/login';
        }
      }
      
      return new Promise((resolve, reject) => {
        reject(error);
      });
    },
  );

  return axiosHelper;
};

export default axiosHelper
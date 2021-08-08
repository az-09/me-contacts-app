Step 1. 
- App.js
import React from 'react'

const App = () => {
    return (
        <div>
            
        </div>
    )
}

export default App


- index.js

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

- ReactDOM.render(

  <App />,
  document.getElementById('root'),
);


index.css

Step 2. Router
- npm i react-router-dom 
- routes.js
export const routes  = [
  {
    path: '/auth/register',
    component: RegisterPage,
    title: 'Register',
    needsAuth: false,
  },
  {
    path: '/auth/login',
    component: LoginPage,
    title: 'Login',
    needsAuth: false,
  },
  {
    path: '/contacts/create',
    component: CreateContactPage,
    title: 'Create Contact',
    needsAuth: true,
  },
  {
    path: '/',
    component: ContactsPage,
    title: 'Contacts',
    needsAuth: true,
  },

];

- views -> Contacts(Page.js), CrateContact(Page.js), Login(Page.js), Register(Page.js)
- rafce (react arrow function export component )

- App.js
  return (
        <div>
            <BrowserRouter>
                <Switch>
                  {routes.map(route => <RenderRoute {...route} key={route.title}/> )}
                </Switch>
            </BrowserRouter>
        </div>
    )

- RenderRoute.js
const RenderRoute = (route) => {
  const { needsAuth, path, component, title } = route;

  document.title = title || "ME Contacts";

  const history = useHistory();

  if (needsAuth && !localStorage.token) {
    // only if not authenticated but needs auth, authenticated = token exists
    history.push("/auth/login");
  }

  return <Route path={path} exact component={component} />;
};

Step 3. axiosHelper and Env.
- npm i axios

- axiosHelper.js

- .Env
REACT_APP_BACKEND_URL=

Step 4. Context
- authInitialState.js
const authInitialState ={ 
    loading: false,
    data: null,
    error: null,
}

- context/authentication/authActions.js
export const REGISTER_LOADING = 'REGISTER_LOADING';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';

export const LOGIN_LOADING = 'LOGIN_LOADING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const LOGOUT_USER = 'LOGOUT_USER';

export const CONNECTION_ERROR = "Could not connect";

- context/authentication/authReducer.js
...
const authReducer = (state, {type, payload}) => {
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

    default:
        return state;
}
};

- Provider.js
export const Context = createContext({});

export const Provider = ({ children }) => {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);

  return (
    <Context.Provider
      value={{
        authState,
        authDispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};

- App.js
 <Provider>
  <BrowserRouter>
    <Switch>
      {routes.map((route) => (
        <RenderRoute {...route} key={route.title} />
      ))}
    </Switch>
  </BrowserRouter>
</Provider>

- Step 5. RegisterPage.js
const postRegister =
  ({ email, password, username, lastName: last_name, firstName: first_name }) =>
  (dispatch) => {
    dispatch({
      type: REGISTER_LOADING,
    });

    axiosHelper()
      .post("/auth/register", {
        email,
        password,
        username,
        last_name,
        first_name,
      })
      .then((res) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: REGISTER_ERROR,
          payload: err.response ? err.response.data : CONNECTION_ERROR,
        });
      });
  };

- Step 6. RegisterPage.js
npm i semantic-ui-react
npm i semantic-ui-css 

- Step 7. postLogin.js
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

- Step 8. LoginPage.js


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

- Step 5. postRegister.js
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
...
  useEffect(() => {
    if (data) {
      // to prevent endless loop after registered and then returned from login because data already exists, reinitialize state
      logout(history)(authDispatch); 

      history.push("/auth/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
...


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
...
  useEffect(() => {
    
    if (data && data.token) {
        history.push("/")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
...

- Step 9. logout.js
const logout = (history) => (dispatch) => {
  localStorage.removeItem('token');  
  dispatch({
    type: LOGOUT_USER, // reinitialize state
  });
  history.push('/auth/login');

};


- Step 9. contactsActions.js

export const GET_CONTACTS_LOADING = 'GET_CONTACTS_LOADING';
export const GET_CONTACTS_SUCCESS = 'GET_CONTACTS_SUCCESS';
export const GET_CONTACTS_ERROR = 'GET_CONTACTS_ERROR';

export const DELETE_CONTACT_LOADING = 'DELETE_CONTACT_LOADING';
export const DELETE_CONTACT_SUCCESS = 'DELETE_CONTACT_SUCCESS';
export const DELETE_CONTACT_ERROR = 'DELETE_CONTACT_ERROR';

- Step 10. contactsInitialState.js
export const contactsInitialState = {
  loading: false,
  error: null,
  data: [],
};

- Step 11. contactsReducer.js
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

- Step 12. Provider.js
...
  const [contactsState, contactsDispatch] = useReducer(contactsReducer, contactsInitialState)
...
  <Context.Provider
      value={{
        ...
        contactsState,
        contactsDispatch
      }}
    >

- Step 13. getContacts.js
...

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

- Step 14. ContactsPage.js
...
const ContactsPage = () => {
  const {
    contactsDispatch,
    contactsState,
  } = useContext(Context);

  const history = useHistory();

  const {data} = contactsState

  useEffect(() => {
    if (data.length === 0) {
      getContacts(history)(contactsDispatch);
    }
  }, []);

  return (
      <div>
          
          <NavBar />
          <ContactListPage {...contactsState}/>
      </div>
  );
};

- Step 15-1. ImageThumb.js and ImageThumb.css

- Step 15-2. ContactListPage.js
const ContactListPage = (state) => {
  const { loading, data } = state;

  return (
    <div>
      <Header>ALL</Header>
      {loading && (
        <>
          {" "}
          <Placeholder>
            <Placeholder.Header image>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
        </>
      )}
      {!loading && data.length === 0 && (
        <Message content="No contacts to show." />
      )}

      <List>
        {data.length > 0 &&
          data.map((contact) => (
            <List.Item key={contact.id} disabled={contact.deleting}>
              <List.Content floated="right">
                <span>
                  {contact.country_code} {contact.phone_number}
                </span>
    
              </List.Content>
              <List.Content style={{ display: "flex", alignItems: "center" }}>
                 <ImageThumb
                  firstName={contact.first_name}
                  lastName={contact.last_name}
                  src={contact.picture_url}
                />
                <span>
                  {contact.first_name} {contact.last_name}
                  {contact.is_favorite && <Icon name="heart" color="red" />}
                </span>
              </List.Content>
            </List.Item>
          ))}
      </List>
    </div>
  );
};

- Step 16. contactsReducer.js
...
    case DELETE_CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.filter(contact => contact.id !== payload)

      };


- Step 16. deleteContact.js
const deleteContact = (id) => (dispatch) => {
    dispatch({
        type: DELETE_CONTACT_LOADING
    })

    axiosHelper()
    .delete(`/contacts/${id}`)
    .then(() => {
        dispatch({
            type: DELETE_CONTACT_SUCCESS,
            payload: id
        })
    })
    .catch((err) => {
        dispatch({
            type: DELETE_CONTACT_ERROR,
            payload: err.response ? err.response.data : CONNECTION_ERROR
        })
    })
}

- Step 17. ContactListPage.js
...
const { contactsDispatch } = useContext(Context);

const handleDeleteContact = (id) => {
  deleteContact(id)(contactsDispatch);
 };
...
  <Button
    color="red"
    size="tiny"
    onClick={() => handleDeleteContact(contact.id)}
  >
    <Icon name="delete" />
  </Button>


- Step 18. contactInitialState.js
// to handle CreateContactPage
const contactInitialState = {
    loading: false,
    data: null,
    error: null,
}

export default contactInitialState


- Step 19. contactAction.js
export const CREATE_CONTACT_LOADING = 'CREATE_CONTACT_LOADING';
export const CREATE_CONTACT_SUCCESS = 'CREATE_CONTACT_SUCCESS';
export const CREATE_CONTACT_ERROR = 'CREATE_CONTACT_ERROR';

export const CLEAR_CREATE_CONTACT = 'CLEAR_CREATE_CONTACT';

- Step 19. contactReducer.js
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


- Step 20. Provider.js
  const [contactState, contactDispatch] = useReducer(contactReducer, contactInitialState)
  
  return (
    <Context.Provider
      value={{
        ...
        contactState, 
        contactDispatch,
      }}
    >

- Step 20. CreateContactPage.js, CreateContactPage.css

- step 21. countries.js

- Step 22. contactsActions.js
...
export const ADD_CONTACT_TO_CONTACTS = 'ADD_CONTACT_TO_CONTACTS'

- Step 23. contactsReducer.js
...
    case ADD_CONTACT_TO_CONTACTS:
      return {
        ...state,
        data: [...state.data, payload],
      };

- Step 24. addContactToContacts.js
const addContactToContacts = (contact) => (dispatch) => {   
    dispatch({
        type: ADD_CONTACT_TO_CONTACTS,
        payload: contact
    })
}

- Step 25. CreateContactPage.js
...
  useEffect(() => {
    if (data) {
      addContactToContacts(data)(contactsDispatch);
      ...
    }
    ...
  }, [data]);


- Step 26. CreateContactPage.js
  useEffect(() => {
    ...
    clearCreateContact()(contactDispatch);
  }, [data]);


- Step 27. clearCreateContact.js
const clearCreateContact = () => (dispatch) => {
    dispatch({
        type: CLEAR_CREATE_CONTACT
    })
}

- Step 28. contactActions.js
export const CLEAR_CREATE_CONTACT = 'CLEAR_CREATE_CONTACT';


- Step 29. contactReducer.js
...
    case CLEAR_CREATE_CONTACT:{
      return{
        ...contactInitialState
      }
    }

- Step 30. Install firebase
npm install --save firebase

- Step 31. firebaseHelper.js
import firebase from 'firebase/app';
import 'firebase/storage';

const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_MESSAGING_ID,
  REACT_APP_FIREBASE_API_ID,
} = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_ID,
  appId: REACT_APP_FIREBASE_API_ID,
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export default storage;
// export { storage, firebase as default };

- Step 32. createContact.js
...
  const saveToBackend = (url = null) => axiosHelper()
    .post("/contacts/", {
      last_name,
      first_name,
      phone_number,
      country_code,
      picture_url: url,
      is_favorite,
    })
...
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


- Step 33. contactsActions.js
...
export const SEARCH_CONTACTS = 'SEARCH_CONTACTS'

- Step 34. contactsInitialState.js
const contactsInitialState = {
 ...
  isSearchActive: false,
  contactsFound: []
};

- Step 35. NavBar.js
...
  const {
    ...,
    contactsDispatch
  } = useContext(Context);
...
 const onSearchFieldChange = (e, {value}) => {
    // The g modifier is used to perform a global match (find all matches rather than stopping after the first match).
    const searchText = value.trim().replace(/' '/g, '')
   
    contactsDispatch({
      type: SEARCH_CONTACTS,
      payload: searchText
    })
    
  }
...
      {isAuthenticated() && (
        <Menu.Item position="right">
          <Input style={{width:300}} placeholder="Search Contacts" onChange={onSearchFieldChange}/>
        </Menu.Item>
      )}

- Step 35. contactsReducer.js
  case SEARCH_CONTACTS:
      const searchText = payload?.toLowerCase();
      return {
        ...state,
        loading: false,
        isSearchActive: !!searchText, // https://betterprogramming.pub/10-modern-javascript-tricks-every-developer-should-use-377857311d79
        contactsFound: state.data.filter((contact) => {
          try { // to prevent special characters which result in breaking app
            return (
              contact.first_name.toLowerCase().search(searchText) !== -1 ||
              contact.last_name.toLowerCase().search(searchText) !== -1 ||
              contact.phone_number.toLowerCase().search(searchText) !== -1
            );
          } catch (error) {
            return [];
          }
        }),
      };

- Step 36. ContactListPage.js
...
const { ... isSearchActive, contactsFound } = state;

...
  const currentContacts = isSearchActive ? contactsFound : data
...
  {!loading && currentContacts.length === 0 && (
        <Message content="No contacts to show." />
      )}

      <List>
        {currentContacts.length > 0 && currentContacts.length &&
          currentContacts.map((contact) => (


- Step 37-1. ContactListPage.js
...
   <Button onClick={() => handleUpdateFavorite(contact.id, contact.is_favorite)}>
                  {contact.is_favorite ? 'UnFavorite' : 'Favorite'}
                </Button>

- Step 37-2
...
  const handleUpdateFavorite = (id, is_favorite) => {
    updateFavorite(id, !is_favorite)(contactsDispatch)
    
  }


- Step 38 updateFavorite.js
...
const updateFavorite = (id, is_favorite) => (dispatch) => {
  dispatch({
    type: UPDATE_FAVORITE_LOADING,
  });

  axiosInstance()
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

- Step 39 contactsInitialState.js
...
export const UPDATE_FAVORITE_LOADING = 'UPDATE_FAVORITE_LOADING'
export const UPDATE_FAVORITE_SUCCESS = 'UPDATE_FAVORITE_SUCCESS'
export const UPDATE_FAVORITE_ERROR = 'UPDATE_FAVORITE_ERROR'


- Step 40 contactsReducer.js
...
case UPDATE_FAVORITE_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: state.data.map((contact) => {
          if (contact.id === payload.id) {
            return payload;
          }
          return contact;
        }),
      };
    }




- Step 41. ContactsPage.js
...
    <FavoritesPage  {...contactsState}/>


- Step 42. FavoritesPage.js


- Step 43. FavoritesPage.css


- Step 44. CreateContactPage.js
...
const formNotCompleted = Object.values(form).filter(value => value && value !== '')?.length > 0 
...
    <Prompt
        when={formNotCompleted}
        message="You have unsaved changes, would you like to leave?"

      />






- Step 45-1. Layload, routes.js

import {lazy} from 'react';
...
// import CreateContactPage from '../../views/CreateContact/CreateContactPage';
const CreateContactPage = lazy(() => import('../../views/CreateContact/CreateContactPage'))


- Step 45-2. Layload, App.js
          <Suspense fallback={<p>Loading</p>}>
            <Switch>
              {routes.map((route) => (
                <RenderRoute {...route} key={route.title} />
              ))}
            </Switch>
          </Suspense>





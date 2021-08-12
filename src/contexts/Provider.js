import React, { createContext, useReducer } from "react";
import authInitialState from "./authentication/authInitialState";
import authReducer from "./authentication/authReducer";



import contactInitialState from "./contact/contactInitialState";
import contactReducer from "./contact/contactReducer";
import contactListInitialState from "./contacts/contactsInitialState";
import contactListReducer from "./contacts/contactsReducer";



export const Context = createContext({});

export const Provider = ({ children }) => {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);
  const [contactsState, contactsDispatch] = useReducer(contactListReducer, contactListInitialState)
  const [contactState, contactDispatch] = useReducer(contactReducer, contactInitialState)
  
  return (
    <Context.Provider
      value={{
        authState,
        authDispatch,
        contactsState,
        contactsDispatch,
        contactState, 
        contactDispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};

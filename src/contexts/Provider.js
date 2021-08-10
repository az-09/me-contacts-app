import React, { createContext, useReducer } from "react";
import authInitialState from "./authentication/authInitialState";
import authReducer from "./authentication/authReducer";
import { contactsInitialState } from "./contacts/contactsInitialState";
import contactsReducer from "./contacts/contactsReducer";

export const Context = createContext({});

export const Provider = ({ children }) => {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);
  const [contactsState, contactsDispatch] = useReducer(contactsReducer, contactsInitialState)

  return (
    <Context.Provider
      value={{
        authState,
        authDispatch,
        contactsState,
        contactsDispatch
      }}
    >
      {children}
    </Context.Provider>
  );
};

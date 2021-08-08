import React, { createContext, useReducer } from "react";
import authInitialState from "./authentication/authInitialState";
import authReducer from "./authentication/authReducer";

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

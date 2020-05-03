import React, { useState, useReducer, createContext, useContext } from 'react';
// import { useState, useReducer } from 'reinspect';
import { authReducer } from '../reducers/globalReducer';
import { AUTH_LOGIN_SUCCESS, AUTH_EXPIRE, AUTH_LOGOUT } from '../constant';
import { getFromLocalStorage } from '../helper';

const GlobalContext = createContext();

const authInitialState = {
  isLoggedIn: false,
  user: null
};

const persistedAuthState = getFromLocalStorage('auth') ? getFromLocalStorage('auth') : authInitialState;

const otherInitialState = {
  testBoolean: false,
};

export const useGlobalState = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [auth, authDispatcher] = useReducer(authReducer, persistedAuthState);

  const [other, setOther] = useState(otherInitialState);

  const authInSuccess = (user) => {
    authDispatcher({
      type: AUTH_LOGIN_SUCCESS,
      payload: user
    });
  }

  const authExpire = () => {
    authDispatcher({
      type: AUTH_EXPIRE,
    });
  }

  const authOutSuccess = () =>
    authDispatcher({
      type: AUTH_LOGOUT,
    });

  return (
    <GlobalContext.Provider
      value={{ auth, authInSuccess, authExpire, authOutSuccess, other, setOther }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

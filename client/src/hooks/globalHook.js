import React, { useReducer, createContext, useContext } from 'react';
// import { useState, useReducer } from 'reinspect';
import { authReducer, sfEventReducer } from '../reducers/globalReducer';
import { AUTH_LOGIN_SUCCESS, AUTH_EXPIRE, AUTH_LOGOUT, SF_EVENT_ADD_NEW, SF_EVENT_REMOVE_OLD } from '../constant';
import { getFromLocalStorage } from '../helper';

const GlobalContext = createContext();

const authInitialState = {
  isLoggedIn: false,
  user: null
};

let sfEventInitialState;

const persistedAuthState = getFromLocalStorage('auth') ? getFromLocalStorage('auth') : authInitialState;

export const useGlobalState = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [auth, authDispatcher] = useReducer(authReducer, persistedAuthState);

  const [sfEvent, sfEventDispatcher] = useReducer(sfEventReducer, sfEventInitialState);

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

  const sfEventAddNew = (event) => {
    sfEventDispatcher({
      type: SF_EVENT_ADD_NEW,
      payload: event
    });
  }

  const sfEventRemoveOld = () => {
    sfEventDispatcher({
      type: SF_EVENT_REMOVE_OLD
    });
  }

  return (
    <GlobalContext.Provider
      value={{ auth, authInSuccess, authExpire, authOutSuccess, sfEvent, sfEventAddNew, sfEventRemoveOld }}
    >
      {/* {{ auth: { state: auth, dispatch: authDispatcher, authInSuccess } }} */}
      {children}
    </GlobalContext.Provider>
  );
};

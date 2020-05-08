import { AUTH_LOGIN_SUCCESS, AUTH_UPDATE, AUTH_EXPIRE, AUTH_LOGOUT, SF_EVENT_ADD_NEW, SF_EVENT_REMOVE_OLD } from '../constant';

export const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case AUTH_UPDATE:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case AUTH_EXPIRE:
      return {
        ...state,
        isLoggedIn: false,
        user: null
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

export const sfEventReducer = (state, action) => {
  switch (action.type) {
    case SF_EVENT_ADD_NEW:
      return {
        ...state,
        ...action.payload
      };
    case SF_EVENT_REMOVE_OLD:
      return null;
    default:
      return state;
  }
}
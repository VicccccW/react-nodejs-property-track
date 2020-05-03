import { AUTH_LOGIN_SUCCESS, AUTH_UPDATE, AUTH_EXPIRE, AUTH_LOGOUT } from '../constant';

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
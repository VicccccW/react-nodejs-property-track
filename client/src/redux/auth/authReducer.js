import * as types from "./authTypes";

const initialState = {
  loading: false,
  loggedIn: false,
  user: {},
  error: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        loggedIn: false,
        user: {},
        error: "",
      };
    case types.AUTH_NO_AUTH_INFO:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        user: {},
        error: "",
      };
    case types.AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        user: action.payload,
        error: "",
      };
    case types.AUTH_LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        user: {},
        error: "",
      };
    default:
      return state;
  }
};

export default authReducer;

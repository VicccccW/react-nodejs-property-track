import * as types from "./authTypes";

//action creators
export const loginRequest = () => {
  return {
    type: types.AUTH_LOGIN_REQUEST
  }
}

export const loginRequestSuccess = user => {
  return {
    type: types.AUTH_LOGIN_SUCCESS,
    payload: user
  }
}

export const logoutRequestSuccess = () => {
  return {
    type: types.AUTH_LOGOUT_SUCCESS
  }
}
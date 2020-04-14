import * as types from "./propertyTypes";

//action creators
export const propertyFetchRequest = () => {
  return {
    type: types.PROPERTY_FETCH_REQUEST
  }
}

export const propertyFetchSuccess = items => {
  return {
    type: types.PROPERTY_FETCH_SUCCESS,
    payload: items
  }
}

export const propertyFetchFailure = error => {
  return {
    type: types.PROPERTY_FETCH_FAILURE,
    payload: error
  }
}
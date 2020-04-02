import { GET_ALL_REQUEST, GET_ALL_SUCCESS, GET_ALL_FAILURE } from "./testTypes";

//action creators
export const getAllRequest = () => {
  return {
    type: GET_ALL_REQUEST
  }
}

export const getAllSuccess = data => {
  return {
    type: GET_ALL_SUCCESS,
    payload: data
  }
}

export const getAllFailure = error => {
  return {
    type: GET_ALL_FAILURE,
    payload: error
  }
}

//each action or action creator will be a function to export

//in here we want to return another funciton
//in this return function, we pass dispatch
export const getAll = () => {
  return dispatch => {
    fetch('/api/test/getAll')
      .then(res => res.json())
      .then(data => dispatch(getAllSuccess(data)))
      .catch(error => dispatch(getAllFailure(error.message)))
  }
}


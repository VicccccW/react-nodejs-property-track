import { GET_ALL_REQUEST, GET_ALL_SUCCESS, GET_ALL_FAILURE } from "./testTypes";

const initialState = {
  loading: false,
  data: [],
  error: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: ''
      };
    case GET_ALL_FAILURE:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload
      };
    default:
      return state;
  }
}
import * as types from "./propertyTypes";

const initialState = {
  fetching: false,
  items: [],
  error: ""
};

const propertyDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PROPERTY_FETCH_REQUEST:
      return {
        ...state,
        fetching: true,
        items: [],
        error: ""
      };
    case types.PROPERTY_FETCH_SUCCESS:
      return {
        ...state,
        fetching: false,
        items: action.payload,
        error: ""
      };
    case types.PROPERTY_FETCH_FAILURE:
      return {
        ...state,
        fetching: false,
        items: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default propertyDataReducer;

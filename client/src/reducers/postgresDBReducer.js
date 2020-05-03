import {
  PROPERTY_FETCH_REQUEST,
  PROPERTY_FETCH_SUCCESS,
  PROPERTY_FETCH_FAILURE,
} from '../constant';

export const postgresDBReducer = (state, action) => {
  switch (action.type) {
    case PROPERTY_FETCH_REQUEST:
      return {
        ...state,
        fetching: true,
        items: [],
        error: '',
      };
    case PROPERTY_FETCH_SUCCESS:
      return {
        ...state,
        fetching: false,
        items: action.payload,
        error: '',
      };
    case PROPERTY_FETCH_FAILURE:
      return {
        ...state,
        fetching: false,
        items: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

//action creators
export const propertyFetchRequest = () => {
  return {
    type: PROPERTY_FETCH_REQUEST,
  };
};

export const propertyFetchSuccess = (items) => {
  return {
    type: PROPERTY_FETCH_SUCCESS,
    payload: items,
  };
};

export const propertyFetchFailure = (error) => {
  return {
    type: PROPERTY_FETCH_FAILURE,
    payload: error,
  };
};

const propertyDataReducer = (state = 0, action) => {
  switch (action.type) {
    case 'GET':
      return state + 1;
    default:
      return state = null;
  }
}

export default propertyDataReducer;
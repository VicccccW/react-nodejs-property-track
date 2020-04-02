import { combineReducers } from "redux";
import testReducer from "./test/testReducer";
import authReducer from "./auth/authReducer";
import propertyDataReducer from "./property/propertyReducer";

// Persists our reducer
import { persistReducer } from 'redux-persist';

// Brings in our localStorage from our window object inside of our browser.
import storage from 'redux-persist/lib/storage';

// An object that defines the possiable configuration we want 
// persist-redux to use.
const persistConfig = {

  // Repersents at what point in our reducer object do we want to start
  // storing information. For us we want it at the top level so we pass in root
  // as a value.
  // Top level is the root-reducer.
  key: 'root',

  // Refers to the type of storage we are using (local or session)
  // we are using local storage so we will pass in storage from above.
  storage,

  // An array of reducers (in string value) that we want to store.
  // If the app is refreshed or closed the data is not stored for auth related info.
  whitelist: ['auth']
};

const rootReducers = combineReducers({
  test: testReducer,
  auth: authReducer,
  propertyData: propertyDataReducer
});

export default persistReducer(persistConfig, rootReducers); 
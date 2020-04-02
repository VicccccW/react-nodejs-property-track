import rootReducers from './rootReducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Allows our browser to cache our store depending on certian config options.
import { persistStore } from 'redux-persist';

//a thunk middleware enables us to let action creator to return a function instread an object
const enhancers = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(
  rootReducers,
  enhancers
);

// Passing in our store so we can cache it into either session storage or local storage.
// This will persist our store.
const persistor = persistStore(store);

export { store, persistor }; 
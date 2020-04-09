import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import "./index.css";
import IconSettings from "@salesforce/design-system-react/components/icon-settings";
import BrandBand from "@salesforce/design-system-react/module/components/brand-band";

// Importing in our persistor from our redux store.
// Remember persistor is the persisted version of our store.
// We will be passing the persisted version of our store into the
// the PeristGate component.
import { store, persistor } from "./redux/store";

// Now we need to bring in our persister from our root-reducer.js and the component that will
// leverage inside of our app that will give it the context of our new persisted reducer.
// Gives our app the context of the new persisted reducer.
// Specific for react. There are other versions for differen libs like electron or react-native.
import { PersistGate } from "redux-persist/integration/react";

import App from "./components/App/App.js";

ReactDOM.render(
  <Provider store={store}>
    {/* Passing in our persistor from our redux-store into the PersisteGate component. */}
    {/* The persistor that we are passing in is the persisted version of our redux store. */}
    <PersistGate persistor={persistor}>
      {/* We wrap PersistGate around our app so that our appp can always
          have access to the persistence flow itself.
          This allows the PersistGate to recieve the store and also fire off actions the refresh
          the state every time our app refreshes.
      */}
      <IconSettings iconPath="../public/assets/icons">
        <BrandBand
          className="slds-p-around_small"
          theme="lightning-blue"
          size="small"
        >
          <App />
        </BrandBand>
      </IconSettings>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import IconSettings from '@salesforce/design-system-react/components/icon-settings';
import BrandBand from '@salesforce/design-system-react/module/components/brand-band';
import App from './components/App/App';
import { GlobalProvider } from './hooks/globalHook';
//use this 3rd party pkg to connect useReducer Hook and Redux Dev Tool
// import { StateInspector } from 'reinspect';

ReactDOM.render(
  <IconSettings iconPath="../public/assets/icons">
    <BrandBand
      className="slds-p-around_small"
      theme="lightning-blue"
      size="small"
    >
      {/* <StateInspector> */}
      <GlobalProvider>
        <App />
      </GlobalProvider>
      {/* </StateInspector> */}
    </BrandBand>
  </IconSettings>,
  document.getElementById('root')
);

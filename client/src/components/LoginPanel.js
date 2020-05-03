import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import User from './User';
import Button from '@salesforce/design-system-react/components/button';
import { useGlobalState } from '../hooks/globalHook';

function LoginPanel() {
  const { auth, authOutSuccess } = useGlobalState();

  const history = useHistory();

  async function fetchLogout() {
    const res = await fetch('/api/auth/logout');

    if (res.ok) {
      const resInfo = await res.json();
      return resInfo;
    } else {
      return;
    }
  }

  const loginHandler = () => {
    window.location = '/api/auth/login';
  };

  const logoutHandler = () => {
    fetchLogout()
      .then(() => {
        authOutSuccess();
        history.push('/');
      })
      .catch((err) => console.log(err));
  };

  const [collapse, setCollapse] = useState(false);

  const collapseHandler = () => {
    setCollapse(() => !collapse);
  };

  return (
    <div>
      {auth.isLoggedIn ? (
        <div className="slds-col slds-size_1-of-12 slds-align_absolute-center">
          <div
            className={`slds-dropdown-trigger slds-dropdown-trigger_click ${
              collapse ? 'slds-is-open' : ''
            }`}
            onMouseEnter={collapseHandler}
            onMouseLeave={collapseHandler}
          >
            <span className="slds-avatar slds-avatar_circle slds-avatar_large">
              <img alt="Profile" src="/assets/images/product1.jpg" />
            </span>

            <div className="slds-dropdown slds-dropdown_right">
              <ul
                className="slds-dropdown__list slds-m-around_small"
                role="menu"
              >
                <li className="slds-dropdown__item" role="presentation">
                  <div className="slds-m-around_medium">
                    <User />
                  </div>
                </li>
                <li className="slds-dropdown__item" role="presentation">
                  <Button
                    label="Logout"
                    variant="destructive"
                    onClick={logoutHandler}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <button
            className="slds-button slds-button--brand"
            onClick={loginHandler}
          >
            <svg
              aria-hidden="true"
              className="slds-button__icon--stateful slds-button__icon--left"
            >
              <use href="/assets/icons/utility-sprite/svg/symbols.svg#salesforce1"></use>
            </svg>
            Log in
          </button>
        </div>
      )}
    </div>
  );
}

export default LoginPanel;

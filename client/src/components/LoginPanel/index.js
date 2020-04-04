import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequestSuccess } from "../../redux/auth/authActions";
import Button from "@salesforce/design-system-react/components/button";
import "./index.css";

function LoginPanel() {

  const dispatch = useDispatch();

  let isLoggedIn = useSelector(state => state.auth.loggedIn);

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
    window.location = "/api/auth/login";
  };

  const logoutHandler = () => {
    console.log('in dispatch logoutRequestSuccess');
    fetchLogout()
      .then(res => {
        dispatch(logoutRequestSuccess());
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      {isLoggedIn ? (
        <Button label="Logout" variant="destructive" onClick={logoutHandler} />
      ) : (
          <div className="slds-align--absolute-center">
            <button
              className="slds-button slds-button--brand"
              onClick={loginHandler}
            >
              <svg
                aria-hidden="true"
                className="slds-button__icon--stateful slds-button__icon--left"
              >
                <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#salesforce1"></use>
              </svg>
            Log in
          </button>
          </div>
        )}
    </div>
  );
}

export default LoginPanel;

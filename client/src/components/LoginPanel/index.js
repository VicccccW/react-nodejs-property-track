import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequestSuccess } from "../../redux/auth/authActions";
import Button from "@salesforce/design-system-react/components/button";
import "./index.css";

function LoginPanel() {
  const dispatch = useDispatch();

  let isLoggedIn = useSelector(state => state.auth.loggedIn);

  const loginHandler = () => {
    window.location = "/api/auth/login";
  };

  const logoutHandler = () => {
    window.location = "/";
    dispatch(logoutRequestSuccess());
    fetch("/api/auth/logout");
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

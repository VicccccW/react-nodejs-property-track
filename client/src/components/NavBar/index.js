import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPanel from "../LoginPanel";
import User from "../User";
import Spinner from "@salesforce/design-system-react/components/spinner";
import "./index.css";

function NavBar() {
  const navStyle = {
    color: "white"
  };

  let isLogInLoading = useSelector(state => state.auth.loading);

  let isLoggedIn = useSelector(state => state.auth.loggedIn);

  return (
    <div className="slds-grid slds-m-vertical_large">
      <div className="slds-col slds-size_8-of-12">
        <nav>
          <ul className="nav-links">
            {isLoggedIn ? (
              <Link to="/propertyMap" style={navStyle}>
                <li>PropertyMap</li>
              </Link>
            ) : (
                ""
              )}
          </ul>
        </nav>
      </div>
      {isLogInLoading ? (
        <div className="slds-col slds-size_4-of-12">
          <div style={{ position: "relative" }}>
            <Spinner
              size="small"
              variant="base"
              assistiveText={{ label: "Main Frame Loading..." }}
            />
          </div>
        </div>
      ) : (
          <div className="slds-col slds-size_4-of-12">
            <div className="slds-grid">
              <div className="slds-col slds-size_8-of-12">
                <User />
              </div>
              <div className="slds-col slds-size_4-of-12">
                <LoginPanel />
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default NavBar;

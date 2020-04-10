import React from "react";
import { useSelector } from "react-redux";
import LoginPanel from "../LoginPanel";
import GlobalNavigationBar from "@salesforce/design-system-react/components/global-navigation-bar";
import GlobalNavigationBarRegion from "@salesforce/design-system-react/components/global-navigation-bar/region";
import GlobalNavigationBarLink from "@salesforce/design-system-react/components/global-navigation-bar/link";
import "./index.css";

function NavBar() {
  let isLoggedIn = useSelector((state) => state.auth.loggedIn);

  return (
    <div className="slds-grid slds-m-vertical_large nav-wrapper slds-align_absolute-center">
      <div className="slds-col slds-size_11-of-12">
        {isLoggedIn ? (
          <GlobalNavigationBar>
            <GlobalNavigationBarRegion region="secondary" navigation>
              <GlobalNavigationBarLink label="Home" href="/" />
              <GlobalNavigationBarLink
                label="Property Map"
                href="/propertyMap"
              />
              <GlobalNavigationBarLink label="Heroku Postgres Data" href="/postgresDB" />
            </GlobalNavigationBarRegion>
          </GlobalNavigationBar>
        ) : (
            ""
          )}
      </div>
      <div className="slds-col slds-size_1-of-12">
        <LoginPanel />
      </div>
    </div>
  );
}

export default NavBar;

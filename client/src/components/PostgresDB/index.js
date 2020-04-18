import React from "react";
import { useSelector } from "react-redux";
import NoAuth from "../NoAuth";
import AllPropertyTable from "./AllPropertyTable";

const intro = `This component will load data from Postgresql Database. 
A Postgresql Database is attached as an addon to this Heroku App and sync data from Salesforce.`;

/**
 * component main entry point
 */
const PostgresDB = () => {
  let isLoggedIn = useSelector((state) => state.auth.loggedIn);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <div className="slds-box slds-theme_shade slds-theme_alert-texture slds-box_small slds-text-font_monospace cmp-body-title-wrapper">
            <div className="slds-box cmp-body-title-container">
              <div className="display-linebreak">{intro}</div>
            </div>
          </div>

          <AllPropertyTable />
        </div>
      ) : (
        <NoAuth />
      )}
    </div>
  );
};

export default PostgresDB;

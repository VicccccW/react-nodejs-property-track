import React from "react";
import { useSelector } from "react-redux";
import NoAuth from "../NoAuth";

function PostgresDB() {
  let isLoggedIn = useSelector((state) => state.auth.loggedIn);

  const intro = `
  This component will render one or more tables from Postgresql Database. 
  In Heroku app, a Postgresql Database is attached as an addon and read data from Salesforce.
  Heroku Connect has the ability to sync data bidirectionally with Salesforce. 
  For now, just enable the default feature, which is pull data from Salesforce.
  `;

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <div className="slds-box slds-theme_shade slds-theme_alert-texture slds-box_small slds-text-font_monospace cmp-body-title-wrapper">
            <div className="slds-box cmp-body-title-container">
              <div className="display-linebreak">{intro}</div>
            </div>
          </div>

          {/* <div>
          here goes a table, using SLDS to render
        </div> */}
        </div>
      ) : (
        <NoAuth />
      )}
    </div>
  );
}

export default PostgresDB;

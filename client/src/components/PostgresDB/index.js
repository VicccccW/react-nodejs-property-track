import React from "react";

function PostgresDB() {
  const intro = `
  This component will render one or more tables from Postgresql Database. 
  In Heroku app, a Postgresql Database will be attached as an addon to the app and sync data bidirectionally to Salesforce.
  `;

  return (
    <div>
      <div className="slds-box slds-theme_shade slds-theme_alert-texture slds-box_small slds-text-font_monospace cmp-body-title-wrapper">
        <div className="slds-box cmp-body-title-container">{intro}</div>
      </div>

      {/* <div>
        here goes a table, using SLDS to render
      </div> */}
    </div>
  );
}

export default PostgresDB;

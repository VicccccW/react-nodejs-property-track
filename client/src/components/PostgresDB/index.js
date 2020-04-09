import React from "react";

function PostgresDB() {

  const intro = `This component will render one or more tables in a Postgres DB.
  In Heroku Context, a Postgres DB will be added to the app and sync data bidirectionally 
  and this component will read data from the DB through express endpoint.`;

  return (
    <div>
      
      <div className="slds-box slds-theme_shade slds-theme_alert-texture slds-box_small slds-text-font_monospace map-container">
        <div className="slds-box map-content-container">
        <p>{intro}</p>
        </div>
      </div>
    </div>
  );
}

export default PostgresDB;

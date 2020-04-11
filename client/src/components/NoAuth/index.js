import React from "react";

function NoAuth() {
  const message = `
  You are not logged in.
  `;

  return (
    <div className="slds-box slds-theme_shade slds-theme_alert-texture slds-box_small slds-text-font_monospace cmp-body-title-wrapper">
      <div className="slds-box cmp-body-title-container">{message}</div>
    </div>
  );
}

export default NoAuth;

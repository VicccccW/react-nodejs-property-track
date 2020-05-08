import React from "react";
import SLDSGreyBox from './SLDSGreyBox';

const NoAuth = () => {
  const message = `You are not logged in.`;

  return (
    <div className="slds-box slds-box_small slds-theme_shade slds-theme_alert-texture slds-text-font_monospace cmp-body-title-wrapper">
      <SLDSGreyBox detail={message} />
    </div>
  );
}

export default NoAuth;
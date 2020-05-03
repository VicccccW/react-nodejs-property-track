import React from 'react';

function SLDSGreyBoxWrap({ children }) {
  return (
    <div className="slds-box slds-box_small slds-theme_shade slds-theme_alert-texture cmp-body-title-wrapper slds-text-font_monospace">
      {children}
    </div>
  );
}

export default SLDSGreyBoxWrap;
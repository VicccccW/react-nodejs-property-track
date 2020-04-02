import React from 'react';
import Button from '@salesforce/design-system-react/components/button';

function TestSLDSForReact() {

  const intro = `TestSLDSForReact PlaceHolder.`;

  return (
    <div>
      <p>{intro}</p>
      <div className="slds-x-small-buttons_horizontal">
        <Button label="Brand" variant="brand" />

        <Button label="Destructive" variant="destructive" />

        <Button label="Outline Brand" variant="outline-brand" />


      </div>

    </div>
  );
}

export default TestSLDSForReact;

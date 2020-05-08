import React from 'react';
import Toast from '@salesforce/design-system-react/components/toast';
import ToastContainer from '@salesforce/design-system-react/components/toast/container';

const SFEventToast = ({ event }) => {

  //use SF toast component 
  //create, green delete, red, update, grey, undelete, grey

  //this component take in one salesforce event message

  const { payload } = event;

  const message = `${payload.Number_of_Records__c} records have been ${payload.Event_Type__c.toLowerCase()}`;

  return (
    <ToastContainer>
      <Toast
        labels={{
          heading: message,
        }}
        variant="success"
        duration={5000}
      />

    </ToastContainer>);
}

export default SFEventToast;


import React from "react";

function About() {

  const intro = `This is a small app combining the power of React, Express, Salesforce, and Heroku.
  Techniques used in the app including but not limited to:
  React, Redux, Express, MongoDB, Salesforce, SFDX, Heroku, Heroku Connect, Postgres.
  The app is developed locally first and then deploy to Heroku.
  Another Serverless version of this app will be developed and released later as another app.`;

  const note = `manually change the following:
  html{font-family:"Salesforce Sans",Arial,sans-serif;font-size:100%;line-height:1.5;background:#b0c4df;color:#080707;-webkit-tap-highlight-color:transparent}
  html{font-family:"Salesforce Sans",Arial,sans-serif;font-size:100%;line-height:1.5;background:#ffffff;color:#080707;-webkit-tap-highlight-color:transparent}
  `

  return (
    <div>
      <p>{intro}</p>
      <p>{note}</p>
    </div>
  );
}

export default About;

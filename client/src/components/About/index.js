import React from "react";
import "./index.css";

function About() {
  const title = `React-SFDX Integration`;

  const intro = `This is a small app combining the power of React, Express, Salesforce, and Heroku.
  Techniques used in the app including but not limited to:
  React, Redux, Express, MongoDB, Salesforce, SFDX, Heroku, Heroku Connect, Postgres.
  The app is developed locally first and then deploy to Heroku.
  Another Serverless version of this app will be developed and released later as another app.`;

  const keywords = `react, express, Salesforce, Heroku, OAuth2, CICD`;

  const build_with = ``;

  return (
    <div className="slds-box slds-box_small about-container slds-text-font_monospace">
      <div className="slds-box slds-m-vertical_small about-content-container">
        <div className="slds-text-title_bold slds-text-title_caps slds-p-vertical_x-small">
          {title}
        </div>
      </div>

      <div className="slds-box slds-m-vertical_small about-content-container">
        <div className="slds-text-title_bold slds-text-title_caps slds-p-vertical_x-small">
          Keywords
        </div>
        <div>{keywords}</div>
      </div>

      <div className="slds-box slds-m-vertical_small about-content-container">
        <div className="slds-text-title_bold slds-text-title_caps slds-p-vertical_x-small">
          Build With
        </div>
        <div className="slds-grid slds-gutters">
          <div class="slds-col slds-size_1-of-4">
            <div className="slds-box">
              <div className="slds-text-title_bold slds-p-vertical_x-small">
                react
              </div>
              <ul>
                <li>React Redux</li>
                <li>React Hooks</li>
                <li>React Router</li>
                <li>SLDS for React</li>
                <li>Create-React-App</li>
              </ul>
            </div>
          </div>
          <div className="slds-col slds-size_1-of-4">
            <div className="slds-box">
              <div className="slds-text-title_bold slds-p-vertical_x-small">
                express
              </div>
              <ul>
                <li>Redis</li>
                <li>Mongoose</li>
                <li>Server Proxy</li>
              </ul>
            </div>
          </div>
          <div className="slds-col slds-size_1-of-4">
            <div className="slds-box">
              <div className="slds-text-title_bold slds-p-vertical_x-small">
                Salesforce
              </div>
              <ul>
                <li>SFDX</li>
                <li>Design Pattern</li>
                <li>SFDC Best Practice</li>
                <li>Lightning Out</li>
                <li>Lightning Web Component</li>
              </ul>
            </div>
          </div>
          <div className="slds-col slds-size_1-of-4">
            <div className="slds-box">
              <div className="slds-text-title_bold slds-p-vertical_x-small">
                Heroku
              </div>
              <ul>
                <li>Pipeline</li>
                <li>Heroku Redis</li>
                <li>Heroku Connect</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="slds-box slds-m-vertical_small about-content-container">
        <div className="slds-text-title_bold slds-text-title_caps slds-p-vertical_x-small">
          Author
        </div>
        <div>Victor Wang</div>
      </div>
    </div>
  );
}

export default About;

import React from 'react';
import SLDSGreyBoxWrap from './SLDSGreyBoxWrap';
import SLDSGreyBox from './SLDSGreyBox';

function About() {
  const aboutData = [
    {
      title: 'React-SFDX Integration',
    },
    {
      title: 'Keyword',
      detail: 'react, express, Salesforce, Heroku, OAuth2, CICD',
    },
    {
      title: 'Build With',
      buildwithList: [
        {
          name: 'react',
          detail: [
            'React Redux',
            'React Hooks',
            'React Router',
            'SLDS for React',
            'Create-React-App',
          ],
        },
        {
          name: 'express',
          detail: [
            'jsforce',
            'Redis',
            'Mongoose',
            'Postgresql',
            'Server Proxy',
          ],
        },
        {
          name: 'Salesforce',
          detail: [
            'SFDX',
            'Design Pattern',
            'SFDC Best Practice',
            'Lightning Out',
            'Lightning Web Component',
          ],
        },
        {
          name: 'Heroku',
          detail: [
            'Pipeline',
            'Heroku Redis',
            'Heroku Connect',
            'Heroku Postgres',
            'The Twelve-Factor App',
          ],
        },
      ],
    },
    {
      title: 'Codebase',
      urls: [
        {
          urlName: 'React App Github:',
          urlLink: 'https://github.com/uniquewq91/react-nodejs-property-track',
        },
        {
          urlName: 'SFDX App Github:',
          urlLink: 'https://github.com/uniquewq91/sfdx-property-track',
        },
      ],
    },
    {
      title: 'Author',
      detail: 'Victor Wang',
    },
  ];

  return (
    <SLDSGreyBoxWrap>
      {aboutData.map((item, i) => (
        <SLDSGreyBox key={i} {...item} />
      ))}
    </SLDSGreyBoxWrap>
  );
}

export default About;

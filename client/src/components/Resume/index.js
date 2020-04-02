import React from "react";

function Resume() {

  const intro = `This component will render a Resume which is downloadable after a visitor enter a email.
  the style of the resume will use SLDS for React to imitate the one I am currently have.`;

  const ideas = `
  1. Brand Band for background
  2. Progress Bar for skill level
  3. Modal for email entering, email will stored in MongoDB, call a API
  `;

  return (
    <div>
      <p>{intro}</p>
      <p>{ideas}</p>
    </div>
  );
}

export default Resume;

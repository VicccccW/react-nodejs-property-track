import React from "react";

function PostgresDB() {

  const intro = `This component will render one or more tables in a Postgres DB.
  In Heroku Context, a Postgres DB will be added to the app and sync data bidirectionally 
  and this component will read data from the DB through express endpoint.`;

  return (
    <div>
      <p>{intro}</p>
    </div>
  );
}

export default PostgresDB;

const { Pool } = require('pg');

const createDBConfig = () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      connectionString: process.env.DATABASE_URL,
      ssl: true
    };
  } else {
    return {
      connectionString: process.env.DATABASE_URL,
      ssl: false
    };
  }
}

const databaseConfig = createDBConfig();

const pool = new Pool(databaseConfig);

module.exports = pool;
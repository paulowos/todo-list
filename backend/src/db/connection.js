const { Pool } = require('pg');

const { DATABASE_URL } = process.env;

const connection = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  database: 'public',
});

module.exports = connection;

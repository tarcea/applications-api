const { Pool } = require('pg');
const dotenv = require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
pool.connect();

module.exports = {
  query: async (text, params) => pool.query(text, params),
  ADD_APPLICATION: `
  INSERT INTO apps (id, first_name, last_name, status )
  VALUES ($1, $2, $3, $4 )
`,
  GET_APPLICATIONS_BY_ID: `select * from apps
  WHERE id = $1`,
  GET_APPLICATIONS_BY_STATUS: `select * from apps
    WHERE status = $1`,
};

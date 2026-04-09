// db.js

const { Pool } = require("pg");
const config = require("./config");

const connectionString = `postgresql://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.database}`;

const pool = new Pool({
  connectionString,
//   ssl: {
//     rejectUnauthorized: false,
//   },
});

// TEST CONNECTION (runs once on startup)
pool.connect((err, client, release) => {
  if (err) {
    console.error("❌ Database connection failed:", err.stack);
  } else {
    console.log("✅ Connected to PostgreSQL");
    release();
  }
});

// OPTIONAL: centralized query helper
const query = (text, params) => pool.query(text, params);

module.exports = {
  pool,
  query,
};
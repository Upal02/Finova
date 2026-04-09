// config.js

const env = require("./env");

const config = {
  app: {
    port: env.PORT,
  },

  db: {
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_DATABASE,
  },

  jwt: {
    secret: env.SECRET_KEY,
    expiresIn: "1d",
  },
};

module.exports = config;
const config = require("./index");

const db = config.db;
const username = db.username;
const password = db.password;
const database = db.database;
const host = db.host;

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: "postgres",
    seederStorage: "sequelize",
  },
  production: {
    ...(process.env.DATABASE_URL
      ? { use_env_variable: "DATABASE_URL" }
      : { username, password, database, host }),
    dialect: "postgres",
    seederStorage: "sequelize",
    ...(db.sslCa && {
      dialectOptions: {
        ssl: { require: true, rejectUnauthorized: true, ca: db.sslCa },
      },
    }),
  },
};

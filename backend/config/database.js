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
    use_env_variable:
      "postgres://jmpyfreypvtpdf:d99585ed1857e427ce16c885a0c448c295f956e73e686fd0eca0ca9736a83b22@ec2-44-198-82-71.compute-1.amazonaws.com:5432/d6m1pgrf3qa7su",
    dialect: "postgres",
    seederStorage: "sequelize",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

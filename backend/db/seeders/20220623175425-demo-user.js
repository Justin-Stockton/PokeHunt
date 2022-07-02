"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "soontobepokemaster@user.io",
          username: "Ash Ketchum",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user1@user.io",
          username: "Demo-lition",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          email: "GaryOak@user.io",
          username: "Gary Oak",
          hashedPassword: bcrypt.hashSync("password3"),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Users",
      {
        username: { [Op.in]: ["Ash Ketchum", "FakeUser1", "Gary Oak"] },
      },
      {}
    );
  },
};

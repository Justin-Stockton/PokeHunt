"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
      */
    return queryInterface.bulkInsert(
      "Pokemons",
      [
        {
          userId: 1,
          name: "Ashe's Pikachu",
          imgUrl:
            "https://archives.bulbagarden.net/media/upload/thumb/archive/1/17/20170907183925%21025Pikachu-Original.png/120px-025Pikachu-Original.png",
          description:
            "He might not be the coolest Pokemon, but he is my best friend. I can't imagine becoming a pokemon master without him by my side!",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};

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
            "https://sm.ign.com/ign_ap/gallery/a/ashs-pikac/ashs-pikachu_3n1b.jpg",
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

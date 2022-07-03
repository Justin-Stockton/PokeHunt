"use strict";
module.exports = (sequelize, DataTypes) => {
  const Pokemon = sequelize.define(
    "Pokemon",
    {
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      imgUrl: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {}
  );
  Pokemon.associate = function (models) {
    // associations can be defined here
    Pokemon.belongsTo(models.User, { foreignKey: "userId" });
    Pokemon.hasMany(models.Review, {
      foreignKey: "pokemonId",
      onDelete: "CASCADE",
      hooks: true,
    });
    Pokemon.hasMany(models.UpVote, {
      foreignKey: "pokemonId",
      onDelete: "CASCADE",
      hooks: true,
    });
  };
  return Pokemon;
};

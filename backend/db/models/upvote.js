"use strict";
module.exports = (sequelize, DataTypes) => {
  const UpVote = sequelize.define(
    "UpVote",
    {
      userId: DataTypes.INTEGER,
      pokemonId: DataTypes.INTEGER,
      upVote: DataTypes.BOOLEAN,
    },
    {}
  );
  UpVote.associate = function (models) {
    // associations can be defined here
    UpVote.belongsTo(models.User, { foreignKey: "userId" });
    UpVote.belongsTo(models.Pokemon, { foreignKey: "pokemonId" });
  };
  return UpVote;
};

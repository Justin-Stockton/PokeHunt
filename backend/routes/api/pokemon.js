const express = require("express");
const asyncHandler = require("express-async-handler");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Pokemon } = require("../../db/models");

// ==== Mid Wares ==== //

const validatePoke = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Please give your pokemon a name."),
  check("name")
    .isLength({ max: 100 })
    .withMessage(
      "'Your pokemon's name can't be more than 100 characters long."
    ),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage(
      "Hey, your pokemon is really cool you should give it a description to tell us more about it!"
    ),
  handleValidationErrors,
];

const router = express.Router();

// ==== TODO CREATE ==== //

router.post(
  "/",
  validatePoke,
  asyncHandler(async (req, res) => {
    const { name, imgUrl, description } = req.body;
    const userId = req.session.auth.userId;
    const pokemon = await Pokemon.create({ userId, name, imgUrl, description });

    return res.json({
      pokemon,
    });
  })
);

// ==== TODO READ ==== //

// ==== - TODO READ ALL ==== //
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const pokes = await Pokemon.findAll({ order: [["createdAt", "ASC"]] });
    return res.json({
      pokes,
    });
  })
);
// ==== - TODO READ ONE ==== //

// ==== TODO UPDATE ==== //

router.put(
  "/:pokeId(\\d+)",
  validatePoke,
  asyncHandler(async (req, res) => {
    const { name, imgUrl, description } = req.body;

    const pokemonId = parseInt(req.params.pokeId, 10);
    const userId = req.session.auth.userId;

    const pokemon = await Pokemon.findOne({ where: { pokemonId, userId } });
    pokemon.name = name;
    pokemon.imgUrl = imgUrl;
    pokemon.description = description;
    await pokemon.save();

    return res.json({
      message: "update worked",
      pokemon,
    });
  })
);

// ==== TODO DELETE ==== //
router.post(
  "/:pokeId(\\d+)",
  asyncHandler(async (req, res) => {
    const pokemonId = parseInt(req.params.pokeId, 10);
    const userId = req.session.auth.userId;

    const pokemon = await Pokemon.destroy({ where: { pokemonId, userId } });

    return res.json({
      pokemon,
    });
  })
);

module.exports = router;

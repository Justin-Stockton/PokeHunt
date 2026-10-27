const express = require("express");
const asyncHandler = require("express-async-handler");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Pokemon } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

async function ownedPokemon(req, _res, next) {
  const pokemon = await Pokemon.findByPk(req.params.pokeId);
  if (!pokemon) {
    const err = new Error("Pokemon not found");
    err.status = 404;
    return next(err);
  }
  if (pokemon.userId !== req.user.id) {
    const err = new Error("Forbidden");
    err.status = 403;
    return next(err);
  }
  req.pokemon = pokemon;
  return next();
}

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
  requireAuth,
  validatePoke,
  asyncHandler(async (req, res) => {
    const { name, imgUrl, description } = req.body;
    const pokemon = await Pokemon.create({
      userId: req.user.id,
      name,
      imgUrl,
      description,
    });

    return res.json({
      pokemon,
    });
  })
);

// ==== TODO READ ==== //

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const pokemon = await Pokemon.findAll({ order: [["createdAt", "ASC"]] });
    return res.json({
      pokemon,
    });
  })
);

router.get(
  "/:userId(\\d+)",
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const usersPokemon = await Pokemon.findAll({ where: { userId } });

    return res.json({
      usersPokemon,
    });
  })
);

// ==== - TODO READ ONE ==== //

router.get(
  "/:pokeId(\\d+)",
  asyncHandler(async (req, res) => {
    const pokemonId = parseInt(req.params.pokeId, 10);

    const pokemon = await Pokemon.findOne({ where: { pokemonId } });
    return res.json({
      message: `A wild ${pokemon.name} appeared!!`,
      pokemon,
    });
  })
);

// ==== TODO UPDATE ==== //

router.put(
  "/:pokeId(\\d+)",
  requireAuth,
  asyncHandler(ownedPokemon),
  validatePoke,
  asyncHandler(async (req, res) => {
    const { name, imgUrl, description } = req.body;
    const pokemon = req.pokemon;

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
  requireAuth,
  asyncHandler(ownedPokemon),
  asyncHandler(async (req, res) => {
    await req.pokemon.destroy();

    return res.json({
      pokemon: 1,
    });
  })
);

module.exports = router;

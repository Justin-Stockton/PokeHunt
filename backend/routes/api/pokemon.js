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

// TODO CREATE

router.post(
  "/",
  validatePoke,
  asyncHandler(async (req, res) => {
    const { userId, name, imgUrl, description } = req.body;
    const pokemon = await Pokemon.create({ userId, name, imgUrl, description });

    return res.json({
      pokemon,
    });
  })
);

// TODO READ

// TODO UPDATE

// TODO DELETE

module.exports = router;

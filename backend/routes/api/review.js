const express = require("express");
const asyncHandler = require("express-async-handler");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Review } = require("../../db/models");

// ==== Mid Wares ==== //

// const validateReview = [handleValidationErrors];

const router = express.Router();

// ==== TODO ==== //

// ==== CREATE ==== //
router.post(
  "/:pokeId(\\d+)",
  //   validateReview,
  asyncHandler(async (req, res) => {
    const { review, pokeId, userId } = req.body;

    const createdReview = await Review.create({
      userId,
      pokeId,
      review,
    });
    return res.json({
      createdReview,
    });
  })
);

// ==== READ ==== //
router.get(
  "/:pokeId(\\d+)",
  asyncHandler(async (req, res) => {
    const pokemonId = parseInt(req.params.pokeId, 10);
    const pokemonReviews = await Reviews.findAll({ where: { pokemonId } });

    return res.json({
      pokemonReviews,
    });
  })
);

// ==== UPDATE ==== //

router.put(
  "/:reviewId(\\d+)",
  asyncHandler(async (req, res) => {
    //
  })
);

// ==== DELETE ==== //

module.exports = router;

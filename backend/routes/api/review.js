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
  "/",
  //   validateReview,
  asyncHandler(async (req, res) => {
    const { review, pokemonId, userId } = req.body;

    const createdReview = await Review.create({
      userId,
      pokemonId,
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
    const pokemonReviews = await Review.findAll({ where: { pokemonId } });

    return res.json({
      pokemonReviews,
    });
  })
);

// // ==== UPDATE ==== //

// router.put(
//   "/:reviewId(\\d+)",
//   //   validateReview,
//   asyncHandler(async (req, res) => {
//     //
//     const { review } = req.body;
//     const reviewId = parseInt(req.params.reviewId, 10);
//     const _review = await Review.findByPk(reviewId);
//     _review.review = review;
//     await _review.save();

//     return res.json({
//       _review,
//     });
//   })
// );

// ==== DELETE ==== //

router.post(
  "/:reviewId(\\d+)",
  asyncHandler(async (req, res) => {
    const reviewId = parseInt(req.params.reviewId, 10);

    const review = await Review.destroy({ where: { id: reviewId } });

    return res.json({
      review,
    });
  })
);

module.exports = router;

const express = require("express");
const asyncHandler = require("express-async-handler");

// const { check } = require("express-validator");
// const { handleValidationErrors } = require("../../utils/validation");
const { Review } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

async function ownedReview(req, _res, next) {
  const review = await Review.findByPk(req.params.reviewId);
  if (!review) {
    const err = new Error("Review not found");
    err.status = 404;
    return next(err);
  }
  if (review.userId !== req.user.id) {
    const err = new Error("Forbidden");
    err.status = 403;
    return next(err);
  }
  req.review = review;
  return next();
}

// ==== Mid Wares ==== //

// const validateReview = [handleValidationErrors];

const router = express.Router();

// ==== TODO ==== //

// ==== CREATE ==== //

router.post(
  "/",
  requireAuth,
  //   validateReview,
  asyncHandler(async (req, res) => {
    const { review, pokemonId } = req.body;

    const createdReview = await Review.create({
      userId: req.user.id,
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
  requireAuth,
  asyncHandler(ownedReview),
  asyncHandler(async (req, res) => {
    await req.review.destroy();

    return res.json({
      review: 1,
    });
  })
);

module.exports = router;

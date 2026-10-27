const express = require("express");
const asyncHandler = require("express-async-handler");

const { UpVote } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const pokemonUpVotes = await UpVote.findAll();

    return res.json({
      pokemonUpVotes,
    });
  })
);

router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { pokemonId } = req.body;

    const addUpVote = await UpVote.create({
      userId: req.user.id,
      pokemonId,
      UpVote: true,
    });

    return res.json({
      addUpVote,
    });
  })
);

// ==== DELETE ==== //

router.post(
  "/delete",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { pokemonId } = req.body;

    const removeUpVote = await UpVote.destroy({
      where: {
        pokemonId,
        userId: req.user.id,
      },
    });

    return res.json({
      message: "update worked",
      removeUpVote,
    });
  })
);

module.exports = router;

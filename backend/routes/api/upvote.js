const express = require("express");
const asyncHandler = require("express-async-handler");

const { UpVote } = require("../../db/models");

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
  asyncHandler(async (req, res) => {
    const { pokemonId, userId } = req.body;

    const addUpVote = await UpVote.create({
      userId,
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
  asyncHandler(async (req, res) => {
    const { pokemonId, userId } = req.body;

    const removeUpVote = await UpVote.destroy({
      where: {
        pokemonId,
        userId,
      },
    });

    return res.json({
      message: "update worked",
      removeUpVote,
    });
  })
);

module.exports = router;

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
    });

    return res.json({
      addUpVote,
    });
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { pokemonId, userId } = req.body;

    const removeUpVote = await UpVote.destroy({
      where: {
        userId,
        pokemonId,
      },
    });

    return res.json({
      removeUpVote,
    });
  })
);

module.exports = router;

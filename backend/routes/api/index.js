const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const pokemonRouter = require("./pokemon.js");
const reviewRouter = require("./review");
const upVoteRouter = require("./upvote");

router.get("/health", (_req, res) => res.json({ status: "ok" }));

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/pokemon", pokemonRouter);

router.use("/review", reviewRouter);

router.use("/upvote", upVoteRouter);

module.exports = router;

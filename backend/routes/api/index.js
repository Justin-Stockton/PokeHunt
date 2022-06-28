const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const pokemonRouter = require("./pokemon.js");
const reviewRouter = require("./review");

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/pokemon", pokemonRouter);

router.use("/review", reviewRouter);

module.exports = router;

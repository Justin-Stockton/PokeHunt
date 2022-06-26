const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const pokemonRouter = require("./pokemon.js");

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/pokemon", pokemonRouter);

module.exports = router;

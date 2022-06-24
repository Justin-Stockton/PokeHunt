const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const pokeRouter = require("./pokemon");

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/pokemon", pokeRouter);

router.post("/test", (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;

const router = require("express").Router();
const { register, login, me } = require("../service/auth.s.js");
const { auth } = require("../middleware/auth.m.js");

router.post("/login", login);
router.post("/register", register);
router.get("/me", auth, me);

module.exports = router;
const router = require("express").Router();
const { createReservation, getMyReservations } = require("../service/reservation.s.js"); 
const { auth } = require("../middleware/auth.m.js");                            

router.post("/create", auth, createReservation);
router.get("/my", auth, getMyReservations);

module.exports = router;
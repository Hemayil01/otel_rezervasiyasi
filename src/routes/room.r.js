const router = require("express").Router();
const RoomService = require("../service/room.s.js");
const {auth, isAdmin } = require("../middleware/auth.m.js");


router.get("/get", RoomService.getAllRooms);
router.get("/search", RoomService.searchAvailableRooms);
router.post("/create", auth, isAdmin, RoomService.createRoom);

module.exports = router;





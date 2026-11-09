const router = require("express").Router();
const { getAllUsersWithReservations, createUser, updateUser, deleteUser } = require("../service/admin.s.js");
const { auth, isAdmin } = require("../middleware/auth.m.js");

router.get("/users", auth, isAdmin, getAllUsersWithReservations);
router.post("/createUser", auth, isAdmin, createUser);
router.put("/updateUser/:id", auth, isAdmin, updateUser);
router.delete("/deleteUser/:id", auth, isAdmin, deleteUser);

module.exports = router;




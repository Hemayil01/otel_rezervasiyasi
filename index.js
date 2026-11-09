const cors = require("cors");
const express = require("express");
const connect = require('./src/db/db.js');
require("dotenv").config();
require("./src/models/roomtype.m.js"); 
require("./src/models/room.m.js");
require("./src/models/reservation.m.js");
require("./src/models/users.m.js");


const authRouter = require("./src/routes/auth.r.js");
const roomRouter = require("./src/routes/room.r.js");        
const reservationRouter = require("./src/routes/reservation.r.js");
const adminRouter = require("./src/routes/admin.r.js");

const app = express();

app.use(cors());
app.use(express.json());

connect();

app.use("/auth", authRouter);
app.use("/room", roomRouter);                     
app.use("/reservation", reservationRouter);    
app.use("/admin", adminRouter);                

app.listen(3000, () => {
    console.log(`Example app listening on port ${3000}`);
});

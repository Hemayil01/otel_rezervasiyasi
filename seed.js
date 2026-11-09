require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/users.m.js");
const RoomType = require("../models/roomtype.m.js");
const Room = require("../models/room.m.js");

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Seed üçün bazaya qoşululdu.");

        // Köhnə məlumatları təmizləyirik (istəyə bağlı)
        await User.deleteMany({});
        await RoomType.deleteMany({});
        await Room.deleteMany({});

     
        const hashedPassword = await bcrypt.hash("admin123", 12);
        const admin = await User.create({
            name: "Hotel Admin",
            login: "admin@hotel.com",
            password: hashedPassword,
            role: "ADMIN"
        });

       
        const standardType = await RoomType.create({ name: "Standard", description: "Standart iki nəfərlik otaq" });
        const deluxeType = await RoomType.create({ name: "Deluxe", description: "Geniş və lüks otaq" });
        const suiteType = await RoomType.create({ name: "Suite", description: "Ən yüksək səviyyəli suite otaq" });

       
        await Room.create([
            {
                roomNumber: "101",
                roomType: standardType._id,
                bedCount: 2,
                pricePerNight: 80
            },
            {
                roomNumber: "201",
                roomType: deluxeType._id,
                bedCount: 1,
                pricePerNight: 150
            },
            {
                roomNumber: "301",
                roomType: suiteType._id,
                bedCount: 3,
                pricePerNight: 250
            }
        ]);

        console.log("Nümunə məlumatlar (Seed data) bazaya uğurla əlavə olundu!");
        process.exit(0);
    } catch (error) {
        console.error("Seed xətası:", error);
        process.exit(1);
    }
}

seedDatabase();

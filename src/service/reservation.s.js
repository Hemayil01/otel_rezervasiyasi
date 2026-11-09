const Reservation = require("../models/reservation.m.js");
const Room = require("../models/room.m.js");


async function createReservation(req, res) {
    try {
        const { roomId, startDate, endDate } = req.body;
        const userId = req.user.id;

       
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ success: false, message: "Otaq tapılmadı!" });
        }

        const existingReservation = await Reservation.findOne({
            roomId,
            $or: [
                { startDate: { $lte: endDate }, endDate: { $gte: startDate } }
            ]
        });

        if (existingReservation) {
            return res.status(400).json({ 
                success: false, 
                message: "Bu otaq göstərilən tarixlərdə artıq başqası tərəfindən rezerv olunub!" 
            });
        }

        const start = new Date(startDate);
        const end = new Date(endDate);
        const timeDiff = end - start;
        const dayCount = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        if (dayCount <= 0) {
            return res.status(400).json({ success: false, message: "Bitmə tarixi başlanğıc tarixindən əvvəl ola bilməz!" });
        }

        const totalPrice = dayCount * room.pricePerNight;

        const newReservation = await Reservation.create({
            userId,
            roomId,
            startDate,
            endDate,
            totalPrice
        });

        return res.status(201).json({
            success: true,
            message: "Rezervasiya uğurla tamamlandı",
            data: newReservation
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

async function getMyReservations(req, res) {
    try {
        const userId = req.user.id;
        const reservations = await Reservation.find({ userId }).populate("roomId");

        return res.status(200).json({
            success: true,
            count: reservations.length,
            data: reservations
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = { createReservation, getMyReservations };

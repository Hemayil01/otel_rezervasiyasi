const Room = require("../models/room.m.js");
const Reservation = require("../models/reservation.m.js");

const RoomService = {
    getAllRooms: async (req, res) => {
        try {
            const rooms = await Room.find(req.query).populate("roomType");
            res.status(200).json({ success: true, data: rooms });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },

    createRoom: async (req, res) => {
        try {
            const room = await Room.create(req.body);
            res.status(201).json({ success: true, data: room });
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    },

    searchAvailableRooms: async (req, res) => {
        try {
            const { checkIn, checkOut } = req.query;

            if (!checkIn || !checkOut) {
                return res.status(400).json({ success: false, message: "Zəhmət olmasa giriş və çıxış tarixlərini qeyd edin." });
            }

            const startDate = new Date(checkIn);
            const endDate = new Date(checkOut);

            if (startDate >= endDate) {
                return res.status(400).json({ success: false, message: "Çıxış tarixi giriş tarixindən sonrakı gün olmalıdır." });
            }

            // Seçilən tarixlərlə kəsişən (dolu olan) rezervasiyaları tapırıq
            const overlappingReservations = await Reservation.find({
                $and: [
                    { startDate: { $lt: endDate } },
                    { endDate: { $gt: startDate } }
                ]
            });

            // Dolu olan otaqların ID-lərini massivə yığırıq
            const bookedRoomIds = overlappingReservations.map(res => res.roomId);

            // Həmin ID-lər xaricində qalan (boş və müsait olan) otaqları tapırıq
            const availableRooms = await Room.find({
                _id: { $nin: bookedRoomIds }
            }).populate("roomType");

            return res.status(200).json({
                success: true,
                count: availableRooms.length,
                data: availableRooms
            });

        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
};

module.exports = RoomService;
const { default: mongoose } = require("mongoose");

const roomSchema = new mongoose.Schema({
    roomNumber: {
        type: String,
        required: true,
        unique: true
    },
    roomType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RoomType",
        required: true
    },
    bedCount: {
        type: Number,
        required: true,
        default: 1
    },
    pricePerNight: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model("Room", roomSchema);

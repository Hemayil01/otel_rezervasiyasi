const { default: mongoose } = require("mongoose");

const roomTypeSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        enum: ["Standard", "Deluxe", "Suite"]
    },
    description: {
        type: String,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model("RoomType", roomTypeSchema);

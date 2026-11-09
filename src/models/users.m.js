const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    login: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    userimg: {
        type: String,
        required: false,
        default: "https://www.freeiconspng.com/uploads/person-icon--icon-search-engine-3.png"
    },
    role: {
        type: String,
        default: "USER",
        enum: ["USER", "ADMIN"]
    }
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

userSchema.virtual("reservations", {
    ref: "reservation",
    localField: "_id",
    foreignField: "userId"
});

module.exports = mongoose.model("User", userSchema);

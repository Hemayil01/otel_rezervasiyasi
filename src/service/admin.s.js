const User = require("../models/users.m.js");
const Reservation = require("../models/reservation.m.js");
const bcrypt = require("bcrypt");



async function getAllUsersWithReservations(req, res) {
    try {
        const users = await User.find()
            .select("-password")
            .populate({
                path: "reservations",
                populate: { path: "roomId" }
            });

        return res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Xəta baş verdi",
            error: error.message
        });
    }
}
async function createUser(req, res) {
    try {
        const { name, login, password, role, userimg } = req.body;

        const existingUser = await User.findOne({ login });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Bu login ilə istifadəçi artıq mövcuddur!" });
        }

        const hashedPassword = await bcrypt.hash(password || "123456", 12);
        
        const newUser = await User.create({
            name,
            login,
            password: hashedPassword,
            role: role || "USER",
            userimg: userimg || "https://www.freeiconspng.com/uploads/person-icon--icon-search-engine-3.png"
        });

        const userObj = newUser.toObject();
        delete userObj.password;

        return res.status(201).json({
            success: true,
            message: "İstifadəçi yaradıldı",
            data: userObj
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { name, login, role, userimg } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, login, role, userimg },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "İstifadəçi tapılmadı!" });
        }

        return res.status(200).json({
            success: true,
            message: "İstifadəçi məlumatları yeniləndi",
            data: updatedUser
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

async function deleteUser(req, res) {
    try {
        const { id } = req.params;

        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "İstifadəçi tapılmadı!" });
        }

        await Reservation.deleteMany({ userId: id });

        return res.status(200).json({
            success: true,
            message: "İstifadəçi və ona aid rezervasiyalar silindi"
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = { 
    getAllUsersWithReservations, 
    createUser, 
    updateUser, 
    deleteUser 
};
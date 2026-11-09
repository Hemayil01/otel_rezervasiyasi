const { default: mongoose } = require("mongoose");

async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("db qosuldu");
    } catch (err) {
        console.error("db qosulmadı:", err.message);
    }
}

module.exports = connect;
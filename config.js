// config.js
const mongoose = require('mongoose');

const dbURI = "mongodb+srv://tej98:tej99@cluster0.vyqmw.mongodb.net/comp3123_assigment1?retryWrites=true&w=majority";

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};


module.exports = connectDB;
// Require Packages

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { text } = require('express');


// Database document schema
const bookingSchema = new mongoose.Schema({
    your_name: {
        type: String,
        required: true
    },
    your_email: {
        type: String,
        required: true,
        unique: true
    },
    car_name: {
        type: String,
        enum: ["Mercedes", "BMW", "Audi","Toyota","Hyundai","Tata"],
        required: true
    },
    pick_up: {
        type: String,
        required: true
    },
    pick_up_time: {
        type:String,
        required: true
    },
    pick_up_date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    drop_off: {
        type: String,
        required: true
    },
    drop_off_time: {
        type:String,
        required: true
    },
    drop_off_date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

// Middleware's
// To Generate a token for the user using jsonwebtoken
bookingSchema.methods.generateAuthToken = async function () {

    try {
        const token = jwt.sign({ _id: this._id.toString() }, "jenilrangpariyajenilrangpariyajenil");
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        res.send("the error part" + error);
    }
};

// create a new collection

const Booking = new mongoose.model('Booking', bookingSchema);
module.exports = Booking;
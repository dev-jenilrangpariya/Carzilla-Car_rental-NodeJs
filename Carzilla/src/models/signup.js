// Require Packages

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Database document schema
const signupSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
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

signupSchema.methods.generateAuthToken = async function () {

    try {
        const token = jwt.sign({ _id: this._id.toString() }, "jenilrangpariyajenilrangpariyajenil");
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        res.send("the error part" + error);
    }
};


// password secure using bcrypt hashing

signupSchema.pre('save', async function (next) {
    
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
        this.confirmpassword = await bcrypt.hash(this.confirmpassword, 10);
    }
    next();
});





// create a new collection

const Signup = new mongoose.model('Signup', signupSchema);
module.exports = Signup;
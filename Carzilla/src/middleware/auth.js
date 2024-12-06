const jwt = require("jsonwebtoken");
const Signup = require("../models/signup");

const auth = async (req, res, next) => {
    try{

        const token = req.cookies.jwt;
        // verify token
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);

        // find user
        const user = await Signup.findOne({ _id: verifyUser._id });

        req.token = token;
        req.user = user;

        next();

    } catch (error) {
        res.status(401).render("user/login");
    }
}   

module.exports = auth;
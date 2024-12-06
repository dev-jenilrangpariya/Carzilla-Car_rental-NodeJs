//  Require Packages

require('dotenv').config();
const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adminRoutes = require('./routes/admin-routes');
const auth = require('./src/middleware/auth');
const app = express();

// Port sender
const port = process.env.PORT || 3000;

// Database Connection

require('./src/db/conn');
const Signup = require('./src/models/signup');
const Booking = require('./src/models/booking');
const Admin = require('./src/models/admin');
// const Car = require('./src/models/carmodel');

const { json } = require('express');
const { log } = require('console');
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
const userpaths = [
  { pathUrl: '/', routeFile: 'index' },
  { pathUrl: '/login', routeFile: 'login' },
  { pathUrl: '/signup', routeFile: 'signup' },
  { pathUrl: '/about', routeFile: 'about' },
  { pathUrl: '/contact', routeFile: 'contact' },
  { pathUrl: '/cars', routeFile: 'cars' },
  { pathUrl: '/service', routeFile: 'service' },
  { pathUrl: '/team', routeFile: 'team' },
  { pathUrl: '/feature', routeFile: 'feature' },
  { pathUrl: '/policy', routeFile: 'policy' },
  { pathUrl: '/reservation', routeFile: 'reservation' },
];

userpaths.forEach((path) => {
  app.use(path.pathUrl, require('./routes/user/' + path.routeFile))
});

// Admin Routes
app.use('/admin', adminRoutes);

// Signup user in database
app.post("/signup", async (req, res) => {

  try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;

    if (password === cpassword) {
      const signup = new Signup({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        password: password,
        confirmpassword: cpassword
      });

      // Generate a token
      const token = await signup.generateAuthToken();

      // Add cookies
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 600000),
        httpOnly: true
      });

      const saveUser = await signup.save();
      res.status(201).render("user/index");

    } else {
      res.send("Passwords are not matching");
    }

  } catch {
    res.status(400).send("invalid details");
  }
});

//  Login Checkup
app.post("/login", async (req, res) => {
  try {

    const email = req.body.email;
    const password = req.body.password;

    // Match a email,password and bcrypt(secure password) with signup database 
    const useremail = await Signup.findOne({ email: email });
    const isMatch = await bcrypt.compare(password, useremail.password);

    // Generate a token
    const token = await useremail.generateAuthToken();

    // Add cookies
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 600000),
      httpOnly: true
    });

    if (isMatch) {
      res.status(201).render("user/index");
    } else {
      res.send("Invalid Details");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});


// Reservation user in database
app.post("/reservation", async (req, res) => {


  try {

    const booking = new Booking({
      your_name: req.body.your_name,
      your_email: req.body.your_email,
      car_name: req.body.car_name,
      pick_up: req.body.pick_up,
      pick_up_time: req.body.pick_up_time,
      pick_up_date: req.body.pick_up_date,
      drop_off: req.body.drop_off,
      drop_off_time: req.body.drop_off_time,
      drop_off_date: req.body.drop_off_date
    });

    const saveBooking = await booking.save();
    res.status(201).send("Your booking has been done successfully");

  } catch (error) {
    res.status(400).send("Invalid Details");
  }
});


// Logout The Website
app.get("/logout", auth, async (req, res) => {
  try {

    // Logout from all devices
    req.user.tokens = [];

    res.clearCookie("jwt");

    await req.user.save();

    res.render("user/login");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/reservation", auth, (req, res) => {
  res.render("user/reservation");
});

// Port Listening
app.listen(port, () => {
  console.log(`Server is Running Successfully on port No: ${port}`);
});

module.exports = app;
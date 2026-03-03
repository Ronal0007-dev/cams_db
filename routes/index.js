const express = require("express");
const router = express.Router();

//flash messages
const flash = require("connect-flash");
router.use(flash());
router.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("cams_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false, // Disable logging; default: console.log
});

const user = require("../models/user")(sequelize, DataTypes);
const Class = require("../models/class")(sequelize, DataTypes);

//import db
const db = require("../db_setup/db_setup");
const bcrypt = require("bcrypt");

router.use(express.urlencoded({ extended: true })); // Parse form data

// GET home page
router.get("/", function (req, res, next) {

  res.render("login", { title: "Express" });
});

//login
// router.get('/create_user', function (req, res, next) {
//   db.sequelize.sync().then(() => {
//     user.create({
//       fName: "Kalla",
//       lName: "Giga",
//       email: "kallagiga@gmail.com",
//       Password: bcrypt.hashSync("password123", 10)
//     }).then(user => {
//       console.log("User created:", user.toJSON());
//       res.redirect('/home');
//     }).catch(err => {
//       console.error("Error creating user:", err);
//       res.status(500).send("Error creating user");
//     });
//   });
// });

//login route
router.post("/login", async function(req, res , next) {
  const  userMail = req.body.mail;
  const password = req.body.password;
  try {
    const userRecord = await user.findOne({ where: { email: userMail } }); 
    if (!userRecord) {
      return res.redirect("/");
    }
    const isMatch = await bcrypt.compareSync(password, userRecord.Password);
    if (isMatch) {
      
      req.session.userId = userRecord.id;
      req.flash('success_msg', 'Login successful!');
      res.redirect("/home");
    } else {
      console.log("Invalid password for email:", userMail);
      req.flash('error_msg', 'Invalid email or password');
      res.redirect("/");
    }
  } catch (error) {
    req.flash('error_msg', 'An error occurred during login. Please try again.');
    console.error("Error during login:", error);
    res.redirect("/");
  }
});

const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return next();
  } else {
    res.redirect("/");
  }
};


//dashboard
router.get("/home", isAuthenticated, function (req, res, next) {
  const chartLabels = ["Male Students", "Female Students"];
  const chartData = [12, 19];
  res.render("index", {
    title: "CAMS | Dashboard",
    data: chartData,
    labels: chartLabels,
  });
});

//student
router.get("/student", isAuthenticated, function (req, res, next) {
  res.render("student", { title: "CAMS | Student" });
});

//add student
router.get("/student/add", isAuthenticated, function (req, res, next) {
  res.render("add_student", { title: "CAMS | Add Student" });
});

//add class
router.get("/class", isAuthenticated, function (req, res, next) {
  res.render("class", { title: "CAMS | Class" });
});

//class
router.get("/class/add", isAuthenticated, function (req, res, next) {
  res.render("add_class", { title: "CAMS | Add Class" });
});

//post classes
router.post("/add-class", isAuthenticated, async function (req, res, next) {
  db.sequelize.sync().then(() => {
    Class.findOrCreate({
      where: { ClassName: req.body.className },
      defaults: { ClassName: req.body.className }
    }).then(([classRecord, created]) => {
      if (created) {
        console.log("Class created:", classRecord.toJSON());
        res.redirect('/class');
      } else {
        console.log("Class already exists:", classRecord.toJSON());
        res.redirect('/class');
      }
    }).catch(err => {
      console.error("Error creating class:", err);
      res.status(500).send("Error creating class");
    });
  });
});

//logout
router.get('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      return next(err);
    }
    res.clearCookie('connect.sid'); // Clear the session cookie name (default is connect.sid)
    res.redirect('/');
  });
});


module.exports = router;

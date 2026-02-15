const express = require('express');
const router = express.Router();

//import db
const db = require('../db_setup/db_setup');
const bcrypt = require('bcrypt');

router.use(express.urlencoded({ extended: true })); // Parse form data

// GET home page
router.get('/', function (req, res, next) {
  res.render('login', { title: 'Express' });
});

//dashboard 
router.get('/home', function (req, res, next) {
  const chartLabels = ['Male Students', 'Female Students'];
  const chartData = [12, 19];
  res.render('index', { title: 'CAMS | Dashboard', data: chartData, labels: chartLabels });
});

//student
router.get('/student', function (req, res, next) {
  res.render('student', { title: 'CAMS | Student' });
}); 

//add student
router.get('/student/add', function (req, res, next) {
  res.render('add_student', { title: 'CAMS | Add Student' });
});

//logout
router.get('/logout', function (req, res, next) {
  res.render('logout', { title: 'CAMS | Logout' });
});

module.exports = router;

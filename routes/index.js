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

module.exports = router;

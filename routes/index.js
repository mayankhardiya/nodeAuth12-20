const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const User = require('../models/User');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

router.get('/list', ensureAuthenticated, (req, res) => {

  console.log('that life');

  User.find().exec(function (err, products) {

    if (err) {
      console.log("error find");
    } else {
      res.render('list', { studentlist: products });
    }

  });

});

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

module.exports = router;

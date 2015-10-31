var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI || 'localhost/restaurant-db');
require('dotenv').load()
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('menu/index', {title: 'Menu Home'})
})

module.exports = router;



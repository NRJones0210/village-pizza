var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI || 'localhost/restaurant-db');
var MenuCategories = db.get('menuCategories')
var Toppings = db.get('toppings')
var Pizzas = db.get('pizzas')
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('menu/index', {title: 'Menu Home'})
})

module.exports = router;



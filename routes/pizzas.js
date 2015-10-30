var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI || 'localhost/restaurant-db');
var MenuCategories = db.get('menuCategories')
var Toppings = db.get('toppings')
var Pizzas = db.get('pizzas')
var PizzaFunctions = require('../lib/pizzas')
require('dotenv').load()
/* GET home page. */

router.get('/', function(req, res, next) {
  Pizzas.find({}).then(function (pizzas) {
    var toppingIds = pizzas.reduce(function (result, pizza) {
      return result.concat(pizza.toppingIds)
    }, [])
    Toppings.find({_id: {$in: toppingIds}}).then(function (toppings) {
      PizzaFunctions.joinPizzaToppings(pizzas, toppings)
      console.log(pizzas)
      console.log(pizzas[0].toppings)

      res.render('pizzas/index', {title: 'Pizza!',
                                pizzas: pizzas
                              })
    })    
  })
})

router.get('/new', function(req, res, next) {
  Toppings.find({}).then(function (toppings) {
    res.render('pizzas/new', {title: 'Add New Pizza',
                              toppings: toppings
                            })
  })
})

router.post('/new', function(req, res, next) {
  var errors = []
  var name = req.body.name
  var toppingIds = []
  // var $checkbox = $('.checkbox')

  // for (var i=0, len=tops.length; i<len; i++) {
  //   if ( tops[i].type === 'checkbox' ) {
  //       tops[i].onclick = function() {
  //         console.log(tops[i])
  //         toppingIds.push(tops[i])
  //       }
  //   }
  // }
  console.log(toppingIds)
  res.redirect('/pizzas')
})

router.get('/:id', function(req, res, next) {
  var pizza;
  var toppings;

  Pizzas.findOne({_id: req.params.id})
    .then(function (pizzaData) {
      pizza = pizzaData
      return Toppings.find({_id: {$in: pizza.toppingIds}})
    })
    .then(function (toppingsData) {
      console.log(toppingsData)
      toppings = toppingsData
      res.render('pizzas/show', {title: 'Pizza!',
                                 pizza: pizza,
                                 toppings: toppings
                               })
    })
})




module.exports = router;


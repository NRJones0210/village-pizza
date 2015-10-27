var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/restaurant-db')
var MenuCategories = db.get('menuCategories')
var Toppings = db.get('toppings')
var Pizzas = db.get('pizzas')
/* GET home page. */

function getPizzas() {
  return Pizzas.find({})
}

function getToppings() {
  return Toppings.find({})
}

router.get('/', function(req, res, next) {
  res.render('menu/index', {title: 'Menu Home'})
})

router.get('/pizza', function(req, res, next) {
  var pizzas;

  getPizzas().then(function (pizzasData) {
    pizzas = pizzasData
    res.render('menu/pizza', { title: 'Pizza!',
                               pizzas: pizzas
    })
  })
})

router.get('/pizza/:id', function(req, res, next) {
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
      res.render('menu/show', { title: 'Pizza!',
                                pizza: pizza,
                                toppings: toppings
                              })
    })
})

module.exports = router;



var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/restaurant-db');
// var db = require('monk')(process.env.MONGOLAB_URI || 'localhost/restaurant-db');
var Users = db.get('users');
var Toppings = db.get('toppings');
var Pizzas = db.get('pizzas');
var Pastas = db.get('pastas');
var Salads = db.get('salads');
var Orders = db.get('orders');
var OrdersFunctions = require('../lib/orders')

// require('dotenv').load()
/* GET home page. */

router.get('/', function(req, res, next) {
  var orders;

  Orders.find({}).then(function (orders) {
    // GET USER
    var userIds = orders.map(function (order) {
      return order.userId
    })
    Users.find({_id: {$in: userIds}}).then(function (ordersUsers) {
      OrdersFunctions.joinOrderUser(orders, ordersUsers)
      // GET PIZZAS
      var orderPizzaIds = orders.reduce(function (result, order) {
        return result.concat(order.orderItemIds.pizzaIds)
      }, [])
// logs
        // console.log('****orderPizzaIds*****')
        // console.log(orderPizzaIds)
      Pizzas.find({_id: {$in: orderPizzaIds}}).then(function (orderPizzas) {
// logs
          // console.log('*****orderPizzas****')
          // console.log(orderPizzas)
        OrdersFunctions.joinOrderPizzas(orders, orderPizzas)
        // GET PIZZA TOPPINGS
        var orderPizzaToppingIds = orderPizzas.reduce(function (result, orderPizza) {
          return result.concat(orderPizza.toppingIds)
        }, [])
// logs
          // console.log('****orderPizzaToppingIds')
          // console.log(orderPizzaToppingIds)
        Toppings.find({_id: {$in: orderPizzaToppingIds}}).then(function (orderPizzaToppings) {  
// logs
            // console.log('****orderPizzaToppings****')
            // console.log(orderPizzaToppings)
          OrdersFunctions.joinOrderPizzaToppings(orders, orderPizzaToppings)
// logs
            // console.log('***!!!!!orders!!!!!***')
            // console.log(orders[0].orderPizzas)
          // GET PASTAS
          var orderPastaIds = orders.reduce(function (result, order) {
            return result.concat(order.orderItemIds.pastaIds)
          }, [])
          Pastas.find({_id: {$in: orderPastaIds}}).then(function (orderPastas) {
            OrdersFunctions.joinOrderPastas(orders, orderPastas)

            // GET SALADS
            var orderSaladIds = orders.reduce(function (result, order) {
              return result.concat(order.orderItemIds.saladIds)
            }, [])
            console.log(orderSaladIds)
            Salads.find({_id: {$in: orderSaladIds}}).then(function (orderSalads) {
              OrdersFunctions.joinOrderSalads(orders, orderSalads)

              res.render('orders/index', {title: 'All Orders',
                                          orders: orders
                                        })
            })
          })
        })
      })
    })
  })
})

module.exports = router;
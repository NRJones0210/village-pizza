var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI || 'localhost/restaurant-db');
var Users = db.get('users');
var MenuCategories = db.get('menuCategories');
var Toppings = db.get('toppings');
var Pizzas = db.get('pizzas');
var Pastas = db.get('pastas');
var Orders = db.get('orders');
var OrdersFunctions = require('../lib/orders')

require('dotenv').load()
/* GET home page. */

router.get('/', function(req, res, next) {
  var orders;

  Orders.find({}).then(function (orders) {
    var userIds = orders.map(function (order) {
      return order.userId
    })
    Users.find({_id: {$in: userIds}}).then(function (ordersUsers) {
      OrdersFunctions.joinOrderUser(orders, ordersUsers)

      var orderPizzaIds = orders.reduce(function (result, order) {
        return result.concat(order.orderItemIds.pizzaIds)
      }, [])
      console.log('****orderPizzaIds*****')
      console.log(orderPizzaIds)

      Pizzas.find({_id: {$in: orderPizzaIds}}).then(function (orderPizzas) {
        console.log('*****orderPizzas****')
        console.log(orderPizzas)
        OrdersFunctions.joinOrderPizzas(orders, orderPizzas)

        var orderPizzaToppingIds = orderPizzas.reduce(function (result, orderPizza) {
          return result.concat(orderPizza.toppingIds)
        }, [])
        console.log('****orderPizzaToppingIds')
        console.log(orderPizzaToppingIds)

        Toppings.find({_id: {$in: orderPizzaToppingIds}}).then(function (orderPizzaToppings) {  
          console.log('****orderPizzaToppings****')
          console.log(orderPizzaToppings)
          OrdersFunctions.joinOrderPizzaToppings(orders, orderPizzaToppings)
          console.log('***!!!!!orders!!!!!***')
          // console.log(orders[0].orderPizzas)


          res.render('orders/index', {title: 'All Orders',
                                      orders: orders
                                    })
        })
      })
    })
  })
})

module.exports = router;
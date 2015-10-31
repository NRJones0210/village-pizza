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

module.exports = {
  joinOrderUser: function (orders, users) {
    orders.forEach(function (order) {
      users.forEach(function (user) {
        if(order.userId.toString() === user._id.toString()) {
          order.user = user
        }
      })
    })
    return orders
  },
  joinOrderItems: function (orders, orderItems) {
    var indexed = orderItems.reduce(function (result, orderItem) {
      result[orderItem._id.toString()] = orderItem
      return result
    }, {})
    orders.forEach(function (order) {
      order.orderItems = order.orderItemIds.map(function (_id) {
        return indexed[_id.toString()]
      })
    })
    return orders
  },    
  joinOrderPizzas: function (orders, orderPizzas) {
    var indexed = orderPizzas.reduce(function (result, orderPizza) {
      result[orderPizza._id.toString()] = orderPizza
      return result
    }, {})
    orders.forEach(function (order) {
      order.orderPizzas = order.orderItemIds.pizzaIds.map(function (_id) {
        return indexed[_id.toString()]
      })
    })
    return orders
  },


  joinOrderPizzaToppings: function (orders, orderPizzaToppings) {
    var indexed = orderPizzaToppings.reduce(function (result, orderPizzaTopping) {
      result[orderPizzaTopping._id.toString()] = orderPizzaTopping
      return result
    }, {})
    orders.forEach(function (order) {
      console.log(order)
      order.orderPizzas.forEach(function (orderPizza) {
        console.log('****orderPizza****')
        console.log(orderPizza)
        orderPizza.toppings = orderPizza.toppingIds.map(function (_id) {
          return indexed[_id.toString()]
        })
      })
    })
    console.log(orders[0].orderPizzas[0])
    return orders
  }
}






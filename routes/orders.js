var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/restaurant-db');
var Users = db.get('users');
var MenuCategories = db.get('menuCategories');
var Toppings = db.get('toppings');
var Pizzas = db.get('pizzas');
var Pastas = db.get('pastas');
var Orders = db.get('orders');
/* GET home page. */

var joinOrderUser = function (orders, users) {
  orders.forEach(function (order) {
    users.forEach(function (user) {
      if(order.userId.toString() === user._id.toString()) {
        order.user = user
      }
    })
  })
  return orders
}

var joinOrderItems = function (orders, orderItems) {
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
}

var joinOrderItemsToppings = function (orders, toppings) {
  var indexed = toppings.reduce(function (result, topping) {
    result[topping._id.toString()] = topping
    return result
  }, {})
  orders.forEach(function (order) {
    order.orderItems.forEach(function (orderItem) {
      orderItem.toppings = orderItem.toppingIds.map(function (_id) {
        // console.log(indexed[_id.toString()])
        return indexed[_id.toString()]
      })
    })
  })
  return orders
}

router.get('/', function(req, res, next) {
  var orders;

  Orders.find({}).then(function (orders) {
    var userIds = orders.map(function (order) {
      return order.userId
    })
    Users.find({_id: {$in: userIds}}).then(function (ordersUsers) {
      joinOrderUser(orders, ordersUsers)

      var orderItemIds = orders.reduce(function (result, order) {
        return result.concat(order.orderItemIds)
      }, [])

      Pizzas.find({_id: {$in: orderItemIds}}).then(function (orderItems) {
        joinOrderItems(orders, orderItems)
// logs
          // console.log(orders)        
                // returns object -> Order
                // with a property -> orderItemsIds
                // paired with a value -> [a,r,r,a,y]
                // {orderItemIds:[#,#]}
          
          // console.log(orders[0].orderItems) 
                // returns the first indexed orderItemId
                // I can get the name property value
                // and return another property, 
                // toppingIds paired with an array value
          
          // console.log(orders[0].orderItems[0].toppingIds) 
                // returns array of just the ids of the toppings
   
          
          // I need to get name property of the toppings object
          // Do I use the joinPizzaToppings() function somehow again?
          // Or do I continue to make variables off orderItems? 
          // console.log(orders)
          // console.log(orderItems) 
        var toppingIds = orderItems.reduce(function (result, topping) {
          return result.concat(topping.toppingIds)
        }, [])
        Toppings.find({_id: {$in: toppingIds}}).then(function (toppings) {  
          joinOrderItemsToppings(orders, toppings)
          // console.log(orders[0].orderItems[0].toppings[0].name)
          res.render('orders/index', {title: 'All Orders',
                                      orders: orders
                                    })
        })
      })
    })
  })
})

module.exports = router;
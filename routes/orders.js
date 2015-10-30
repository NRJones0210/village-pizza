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

      var orderItemIds = orders.reduce(function (result, order) {
        return result.concat(order.orderItemIds)
      }, [])
// Trying to restructure order object for orderItem object within order oject
  // logs
          // console.log('**********')
          // console.log(orders)
          // console.log('**********')
          // console.log(orderItemIds)
          // console.log('**********')
        // var orderPizzaIds = orderItemsIds.pizzas.reduce(function (result, orderItemId) {
        //   return result.concat(orderItemId.orderPizzaIds)
        // }, [])
  // logs
          // console.log('**********')
          // console.log(orderPizzaIds)
          // console.log('**********')
          // console.log(orders)
          // console.log('**********')
        // Pizzas.find({_id: {$in: order.orderItemIds.pizzas}}).then(function (orderPizzas) {
        //   joinOrderPizzas(orders, orderPizzas)
        // })
  // logs
          // console.log(orders)
          // console.log(orders[0].orderItemIds)
          // console.log(orders[0].orderItemIds.pizzas)
      Pizzas.find({_id: {$in: orderItemIds}}).then(function (orderItems) {
        OrdersFunctions.joinOrderItems(orders, orderItems)
// logs
//           // console.log('***** orders *****')
//           // console.log(orders)        
//                 // returns object -> Order
//                 // with a property -> orderItemsIds
//                 // paired with a value -> [a,r,r,a,y]
//                 // {orderItemIds:[#,#]}
//           // console.log('***** orders[0].orderItems *****')
//           // console.log(orders[0].orderItems) 
//                 // returns the first indexed orderItemId
//                 // I can get the name property value
//                 // and return another property, 
//                 // toppingIds paired with an array value
//           // console.log('***** order[0].orderItems[0].toppingIds *****')
//           // console.log(orders[0].orderItems[0].toppingIds) 
//                 // returns array of just the ids of the toppings
          
//           // I need to get name property of the toppings object
//           // Do I use the joinPizzaToppings() function somehow again?
//           // Or do I continue to make variables off orderItems? 
//           // console.log(orders)
//           // console.log(orderItems) 
      var toppingIds = orderItems.reduce(function (result, topping) {
        return result.concat(topping.toppingIds)
      }, [])
      Toppings.find({_id: {$in: toppingIds}}).then(function (toppings) {  
        OrdersFunctions.joinOrderItemsToppings(orders, toppings)
// logs
            // console.log('***** orders[0].orderItems[0].toppings[0].name *****')          
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
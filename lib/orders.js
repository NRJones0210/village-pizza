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
  // joinOrderPizzas: function (orders, orderPizzas) {
  //   var indexed = orderPizzas.reduce(function (result, orderPizza) {
  //     result[orderPizza._id.toString()] = orderPizza
  //     return result
  //   }, {})
  //   orders.forEach(function (order) {
  //     orders.orderItems.pizzas = order.orderItemIds.pizzas.map(function (_id) {
  //       return indexede[_id.toString()]
  //     })
  //   })
  //   return orders
  // },
  joinOrderItemsToppings: function (orders, toppings) {
    var indexed = toppings.reduce(function (result, topping) {
      result[topping._id.toString()] = topping
      return result
    }, {})
    orders.forEach(function (order) {
      order.orderItems.forEach(function (orderItem) {
        orderItem.toppings = orderItem.toppingIds.map(function (_id) {
          return indexed[_id.toString()]
        })
      })
    })
    return orders
  }
}






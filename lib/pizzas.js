module.exports = {
  joinPizzaToppings: function (pizzas, toppings) {
    var indexed = toppings.reduce(function (result, topping) {
      result[topping._id.toString()] = topping
      return result
    }, {})
    pizzas.forEach(function (pizza) {
      pizza.toppings = pizza.toppingIds.map(function (_id) {
        return indexed[_id.toString()]
      })
    })
    return pizzas
  }
}
var db = require('monk')('localhost/restaurant-db')

var Users = db.get('users');
var MenuCategories = db.get('menuCategories')
var Toppings = db.get('toppings')
var Pizzas = db.get('pizzas')
var Orders = db.get('orders')

// USERS
var joeId = Users.id(),
    sueId = Users.id(),
    timId = Users.id(),
    kimId = Users.id()

// TOPPINGS
var pepperoniId       = Toppings.id(),
    italianSausageId  = Toppings.id(),
    hamburgerId       = Toppings.id(),
    baconId           = Toppings.id(),
    hamId             = Toppings.id(),
    canadianBaconId   = Toppings.id(),
    greenPeppersId    = Toppings.id(),
    onionsId          = Toppings.id(),
    blackOlivesId     = Toppings.id(),
    greenOlivesId     = Toppings.id(),
    mushroomsId       = Toppings.id(),
    pineappleId       = Toppings.id(),
    freshTomatoesId   = Toppings.id(),
    garlicId          = Toppings.id(),
    spinichId         = Toppings.id(),
    jalapenosId       = Toppings.id(),
    anchoviesId       = Toppings.id(),
    artichokeHeartsId = Toppings.id(),
    chickenId         = Toppings.id()

// PIZZAS
var deluxeId     = Pizzas.id(),
    meatLoversId = Pizzas.id(),
    hawaiianId   = Pizzas.id(),
    veggieId     = Pizzas.id()

// ORDERS - Testing
var orderOneId = Orders.id(),
    orderTwoId = Orders.id()

Promise.all([
  Users.remove().then(function () {
    return Promise.all([
      Users.insert({_id: joeId, name: 'Joe'}),
      Users.insert({_id: sueId, name: 'Sue'}),
      Users.insert({_id: timId, name: 'Tim'}),
      Users.insert({_id: kimId, name: 'Kim'})
    ])
  }),

  Toppings.remove().then(function () {
    return Promise.all([
      Toppings.insert({_id: pepperoniId, name: 'Pepperoni'}),
      Toppings.insert({_id: italianSausageId, name: 'Italian Sausage'}),
      Toppings.insert({_id: hamburgerId, name: 'Hamburger'}),
      Toppings.insert({_id: baconId, name: 'Bacon'}),
      Toppings.insert({_id: hamId, name: 'Ham'}),
      Toppings.insert({_id: canadianBaconId, name: 'Canadian Bacon'}),
      Toppings.insert({_id: greenPeppersId, name: 'Green Peppers'}),
      Toppings.insert({_id: onionsId, name: 'Onions'}),
      Toppings.insert({_id: blackOlivesId, name: 'Black Olives'}),
      Toppings.insert({_id: greenOlivesId, name: 'Green Olives'}),
      Toppings.insert({_id: mushroomsId, name: 'Mushrooms'}),
      Toppings.insert({_id: pineappleId, name: 'Pineapple'}),
      Toppings.insert({_id: freshTomatoesId, name: 'Fresh Tomatoes'}),
      Toppings.insert({_id: garlicId, name: 'Garlic'}),
      Toppings.insert({_id: spinichId, name: 'Spinich'}),
      Toppings.insert({_id: jalapenosId, name: 'Jalapenos'}),
      Toppings.insert({_id: anchoviesId, name: 'Anchovies'}),
      Toppings.insert({_id: artichokeHeartsId, name: 'Artichoke Hearts'}),
      Toppings.insert({_id: chickenId, name: 'Chicken'})
    ])
  }),

  Pizzas.remove().then(function () {
    return Promise.all([
      Pizzas.insert({
        _id: deluxeId, 
        name: 'Deluxe', 
        toppingIds: [pepperoniId, italianSausageId, greenPeppersId, onionsId]
      }),
      Pizzas.insert({
        _id: meatLoversId,
        name: 'Meat Lovers',
        toppingIds: [pepperoniId, italianSausageId, hamburgerId, hamId]
      }),
      Pizzas.insert({
        _id: hawaiianId,
        name: 'Hawaiian',
        toppingIds: [hamId, baconId, pineappleId, onionsId]
      }),
      Pizzas.insert({
        _id: veggieId,
        name: 'Veggie',
        toppingIds: [greenPeppersId, spinichId, onionsId, mushroomsId, freshTomatoesId, blackOlivesId]
      })
    ])
  }),

  // Order Testing 
  Orders.remove().then(function () {
    return Promise.all([
      Orders.insert({
        _id: orderOneId,
        userId: joeId,
        username: null,
        orderItemIds: [deluxeId, veggieId]
      }),
      Orders.insert({
        _id: orderTwoId,
        userId: timId,
        username: null,
        orderItemIds: [hawaiianId, meatLoversId]
      }),
    ])
  }),
]).then(function () {
  db.close()
});

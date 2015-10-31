var db = require('monk')('localhost/restaurant-db');
// var db = require('monk')(process.env.MONGOLAB_URI || 'localhost/restaurant-db');
// require('dotenv').load();

var Users = db.get('users');
var MenuCategories = db.get('menuCategories')
var Toppings = db.get('toppings')
var Pizzas = db.get('pizzas')
var Pastas = db.get('pastas')
var Salads = db.get('salads')
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

// PASTAS
var spaghettiMeatballId = Pastas.id(),
    lasagnaId           = Pastas.id(),
    manicottiId         = Pastas.id(),
    cannelloniId        = Pastas.id(),
    fettucciniId        = Pastas.id(),
    chickenParmId       = Pastas.id(),
    chickenFettId       = Pastas.id()

// SALADS
var sideSaladId          = Salads.id(),
    chefSaladId          = Salads.id(),
    chickenDijonSaladId  = Salads.id(),
    chickenCeaserSaladId = Salads.id()

// ORDERS
var orderOneId = Orders.id(),
    orderTwoId = Orders.id(),
    orderThreeId = Orders.id(),
    orderFourId = Orders.id()

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
        _id: veggieId,
        name: 'Veggie',
        toppingIds: [greenPeppersId, spinichId, onionsId, mushroomsId, freshTomatoesId, blackOlivesId]
      }),
      Pizzas.insert({
        _id: hawaiianId,
        name: 'Hawaiian',
        toppingIds: [hamId, baconId, pineappleId, onionsId]
      }),
      Pizzas.insert({
        _id: meatLoversId,
        name: 'Meat Lovers',
        toppingIds: [pepperoniId, italianSausageId, hamburgerId, hamId]
      }),
    ])
  }),

  Pastas.remove().then(function () {
    return Promise.all([
      Pastas.insert({
        _id: spaghettiMeatballId,
        name: 'Spaghetti & Meatballs'
      }),
      Pastas.insert({
        _id: lasagnaId,
        name: 'Lasagna'
      }),
      Pastas.insert({
        _id: manicottiId,
        name: 'Manicotti'
      }),
      Pastas.insert({
        _id: cannelloniId,
        name: 'Cannelloni'
      }),
      Pastas.insert({
        _id: fettucciniId,
        name: 'Fettuccini'
      }),
      Pastas.insert({
        _id: chickenParmId,
        name: 'Chicken Parmesan'
      }),
      Pastas.insert({
        _id: chickenFettId,
        name: 'Chicken Fettuccini'
      })    
    ])
  }),

  Salads.remove().then(function () {
    return Promise.all([
      Salads.insert({
        _id: sideSaladId,
        name: 'Side Salad'
      }),
      Salads.insert({
        _id: chefSaladId,
        name: 'Chef Salad'
      }),
      Salads.insert({
        _id: chickenDijonSaladId,
        name: 'Chicken Dijon Salad'
      }),
      Salads.insert({
        _id: chickenCeaserSaladId,
        name: 'Chicken Ceaser Salad'
      })
    ])
  }),                 

  Orders.remove().then(function () {
    return Promise.all([
      Orders.insert({
        _id: orderOneId,
        userId: joeId,
        orderItemIds: {
          pizzaIds: [veggieId, deluxeId],
          pastaIds: [spaghettiMeatballId, chickenFettId],
          saladIds: []
        }
      }),
      Orders.insert({
        _id: orderTwoId,
        userId: timId,
        orderItemIds: {
          pizzaIds: [hawaiianId, meatLoversId],
          pastaIds: [],
          saladIds: []
        }
      }),
      Orders.insert({
        _id: orderThreeId,
        userId: sueId,
        orderItemIds: {
          pizzaIds: [],
          pastaIds: [fettucciniId, lasagnaId],
          saladIds: []
        }
      }),  
      Orders.insert({
        _id: orderFourId,
        userId: kimId,
        orderItemIds: {
          pizzaIds: [],
          pastaIds: [],
          saladIds: [chickenCeaserSaladId, chefSaladId]
        }
      }),                       
    ])
  }),
]).then(function () {
  db.close()
});

var db = require('monk')('localhost/restaurant-db')

var MenuCategories = db.get('menuCategories')
var Toppings = db.get('toppings')
var Pizzas = db.get('pizzas')

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

var deluxeId     = Pizzas.id(),
    meatLoversId = Pizzas.id(),
    hawaiianId   = Pizzas.id(),
    veggieId     = Pizzas.id()


Promise.all([
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
  })
]) 

// var galvanizeId = locations.id(),
//     pivotalId = locations.id(),
//     googleId = locations.id()


// var joeId = users.id(),
//     sueId = users.id(),
//     timId = users.id(),
//     kimId = users.id()

// Promise.all([
//   users.remove().then(function () {
//     return Promise.all([
//       users.insert({_id: joeId, name: 'Joe', follows: [pythonId, phpId]}),
//       users.insert({_id: sueId, name: 'Sue', follows: [pythonId]}),
//       users.insert({_id: timId, name: 'Tim', follows: [rubyId, nodeId]}),
//       users.insert({_id: kimId, name: 'Kim', follows: [pythonId]}),
//     ])
//   }),

//   locations.remove().then(function () {
//     return Promise.all([
//       locations.insert({_id: galvanizeId, name: 'Galvanize', address: 'Platte St, Denver'}),
//       locations.insert({_id: pivotalId, name: 'Pivotal Labs', address: '17th St, Boulder'}),
//       locations.insert({_id: googleId, name: 'Google', address: 'Pearl St, Boulder'}),
//     ])
//   }),

//   meetups.remove({}).then(function () {
//     return Promise.all([
//       meetups.insert({
//         _id: nodeId,
//         name: 'NodeJS',
//         description: 'Learn all the scripts!',
//         locationId: galvanizeId,
//         memberIds: [joeId, kimId],
//       }),
//       meetups.insert({
//         _id: rubyId,
//         name: 'Ruby',
//         description: 'What a gem!',
//         locationId: galvanizeId,
//         memberIds: [timId, kimId],
//       }),
//       meetups.insert({
//         _id: phpId,
//         name: 'PHP',
//         description: 'And oldy but a goodie!',
//         locationId: googleId,
//         memberIds: [sueId, joeId, kimId],
//       }),
//       meetups.insert({
//         _id: pythonId,
//         name: 'Python',
//         description: 'Get your data on!',
//         locationId: googleId,
//         memberIds: [],
//       }),
//     ])
//   }),
// ]).then(function () {
//   db.close()
// })

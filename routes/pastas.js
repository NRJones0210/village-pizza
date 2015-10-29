var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI || 'localhost/restaurant-db');
var MenuCategories = db.get('menuCategories')
var Toppings = db.get('toppings')
var Pastas = db.get('pastas')
/* GET home page. */

router.get('/', function(req, res, next) {
  Pastas.find({}).then(function (pastas) {
    res.render('pastas/index', {title: 'Pasta!',
                                pastas: pastas
                              })
  })
})

router.get('/:id', function(req, res, next) {
  Pastas.findOne({_id: req.params.id}).then(function (pasta) {
    res.render('pastas/show', {title: 'Pasta!',
                               pasta: pasta
                             })
  })
})
module.exports = router;


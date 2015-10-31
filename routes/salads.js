var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/restaurant-db');
// var db = require('monk')(process.env.MONGOLAB_URI || 'localhost/restaurant-db');
var Salads = db.get('salads')
require('dotenv').load()
/* GET home page. */

router.get('/', function(req, res, next) {
  Salads.find({}).then(function (salads) {
    res.render('salads/index', {title: 'Salads!',
                                salads: salads
                              })
  })
})

router.get('/:id', function(req, res, next) {
  Salads.findOne({_id: req.params.id}).then(function (salad) {
    res.render('salads/show', {title: 'Salad!',
                               salad: salad
                             })
  })
})
module.exports = router;


var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI || 'localhost/users-db');
var Users = db.get('users');
var bcrypt = require('bcrypt');
require('dotenv').load()

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.email) {
    res.redirect('/users/loggedIn')
  }
  else {
    res.render('users/index', { title: 'My App' });
  }
});

router.get('/signup', function(req, res, next) {
  res.render('users/signup', { title: 'SIGN UP' });
});

router.post('/signup', function(req, res, next) {
  var errors = []
  var email = req.body.email.trim().toLowerCase()
  var password = req.body.password.trim()
  var passConfirm = req.body.passConfirm.trim()

  if(!email) {
    errors.push('Email can not be blank')
  }
  if(email.indexOf('@') === -1) {
    errors.push('Email invalid. Must contain "@"')
  }
  if(email.indexOf('.') === -1) {
    errors.push('Email invalid. Must contain "."')
  }
  if(!password) {
    errors.push('Password can not be blank')
  }
  if(!passConfirm) {
    errors.push('Password Conformation can not be blank')
  }
  if(!password || !passConfirm || password !== passConfirm) {
    errors.push('Passwords do not match')
  }
  if(errors.length) {
    res.render('users/signup', {
                                  title: 'SIGN UP',
                                  errors: errors,
                                  email: email
    });
  }
  else {
    Users.find({email: email}, function (err, data) {
      if (data.length > 0) {
        errors.push('Email is already used')
        res.render('users/signup', {
                                      title: 'SIGN UP',
                                      errors: errors
        })
      }
      else {
        req.session.email = email
        var hash = bcrypt.hashSync(password, 8)
        Users.insert({
                                  email: email,
                                  password: hash
        })
        res.redirect('/users/loggedIn')
      }
    })
  }
})

router.get('/signin', function(req, res, next) {
  res.render('users/signin', { title: 'SIGN IN' });
});

router.post('/signin', function(req, res, next) {
  var errors = []
  var email = req.body.email.trim()
  var password = req.body.password.trim()

  if(!email) {
    errors.push('Email can not be blank')
  }
  if(email.indexOf('@') === -1) {
    errors.push('Email invalid. Must contain "@"')
  }
  if(email.indexOf('.') === -1) {
    errors.push('Email invalid. Must contain "."')
  }
  if(!password) {
    errors.push('Password can not be blank')
  }
  if(errors.length) {
    res.render('users/signin', {
                                  title: 'SIGN IN',
                                  errors: errors,
                                  email: email
    });
  }
  else {
    Users.findOne({email:email}).then(function (user) {
      if(user) {
        if (bcrypt.compareSync(password, user.password)) {
          req.session.email = email
          res.redirect('/users/loggedIn')
        }
        else {
          errors.push('Invalid Email / Password')
          res.render('users/signin', {
                                          title: 'SIGN IN',
                                          errors: errors
          })
        }
      }
      else {
        errors.push('Invalid Email / Password')
        res.render('users/signin', {
                                        title: 'SIGN IN',
                                        errors: errors
        })
      }
    })
  }
})



router.get('/loggedIn', function(req, res, next) {
  if(req.session.email) {
    res.render('users/loggedin', { 
                                  title: 'LOGGED IN',
                                  email_session: req.session.email 
    })
  }
  else {
    var errors = []
    errors.push('Please sign up or sign in to view this page')
    res.render('users/loggedIn', {
                                    errors: errors
    })
  }
})


router.get('/signout', function(req, res, next) {
  req.session = null
  res.redirect('/')
})

module.exports = router;



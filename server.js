// Twitter auth resource: http://www.danielgynn.com/node-auth-part2/

var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs')
var hbs = require('express-handlebars')
var data = require('./data')
var routes = require('./routes')
var PORT = process.env.PORT || 3000

var session = require('express-session')
var passport = require('passport')
var TwitterStrategy = require('passport-twitter').Strategy;
var configAuth = require('./twitter')

var app = express()

// Templating engine
app.engine('hbs', hbs())
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Enabling cookies and sessions
app.use(require('cookie-parser')())
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Twitter authentication
passport.serializeUser(function(user, cb) {
  cb(null, user);
})

passport.deserializeUser(function(obj, cb) {
  console.log("deserializeUser is used", obj)
  cb(null, obj);
})

app.use(passport.initialize());
app.use(passport.session());

passport.use(new TwitterStrategy({
    consumerKey: configAuth.apikey,
    consumerSecret: configAuth.apisecret,
    callbackURL: configAuth.callbackUrl
  },
  function(token, tokenSecret, profile, done) {
    process.nextTick(function() {
      findUser(profile.id, function(err, user) {
        if (err)
          return done(err)
        if (user) {
          return done(null, user)
        } else {
          var newUser = {}
          newUser.id          = profile.id
          newUser.token       = token
          newUser.username    = profile.username
          newUser.displayName = profile.displayName

          fs.readFile(__dirname + '/data.json', function (err, data) {
            if (err) {
              console.log('Something went wrong in readFile')
              return
            }
            data = JSON.parse(data)
            data.push({
              "user": newUser,
              "meditation": []
            })
            fs.writeFile(__dirname + '/data.json', JSON.stringify(data), function (err) {
              if (err) {
                console.log('Problem writing the data')
              }
            })
          })
        }
      })
    })
  }))

function findUser (id, callback) {
  var userData = data.find(function(elem, i, arr) {
    if (elem.user.id === id) {
      return true
    } else {
      return false
    }
  })
  var user = userData? userData.user : undefined
  callback(null, user)
}

// ------------------------------------------//

// Static resources
app.use(express.static('public'))

// This is the non logged in view
app.get('/', routes.index)

// This is the logged in view
app.get('/user', routes.user)

app.post('/result', routes.result)

app.get('/history', routes.history)

// Twitter routes
app.get('/login/twitter', passport.authenticate('twitter'))

app.get('/login/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/user',
  failureRedirect: '/',
  })
)


// Server is listening
app.listen(PORT, function () {
  console.log('Server listening on ' + PORT)
})

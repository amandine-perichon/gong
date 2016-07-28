var express = require('express')
var hbs = require('express-handlebars')
var data = require('./data')
var routes = require('./routes')
var PORT = process.env.PORT || 3000

var app = express()

app.engine('hbs', hbs())

app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')


app.get('/', routes.index)

app.listen(PORT, function () {
  console.log('Server listening on ' + PORT)
})

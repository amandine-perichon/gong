var bodyParser = require('body-parser')
var fs = require('fs')
var data = require('./data')

module.exports = {
  index: index,
  user: user,
  result: result
}

function index (req, res) {
  res.render('timer', data)
}

function user (req, res) {
  res.render('user', data)
  //console.log(req.session.passport.user.username)
}

function result (req, res) {
  var userId = req.session.passport.user.id
  var duration = req.body.duration
  var epoch = req.body.epoch
  console.log(userId, duration, epoch)

  fs.readFile(__dirname + '/data.json', function (err, data) {
    if (err) {
      console.log('Something went wrong in readFile')
      return
    }
    data = JSON.parse(data)

    data = data.map(function (elem, i) {
      if (elem.user.id === userId) {
        elem.meditation.push({
          "duration": duration,
          "epoch": epoch
        })
      }
      console.log(elem)
      return elem
    })

    console.log(data)

    fs.writeFile(__dirname + '/data.json', JSON.stringify(data), function (err) {
      if (err) {
        console.log('Problem writing the data')
      }
    })

  })
}

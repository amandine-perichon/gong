var data = require('./data')

module.exports = {
  index: index,
  user: user
}

function index (req, res) {
  res.render('timer', data)
}

function user (req, res) {
  //res.render('user', data)
  res.send('Logged in as ' + req.session.passport.user.username)
  console.log(req.session.passport.user.username)
}

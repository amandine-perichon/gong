var data = require('./data')

module.exports = {
  index: index
}

function index (req, res){
  res.render('timer', data)
}

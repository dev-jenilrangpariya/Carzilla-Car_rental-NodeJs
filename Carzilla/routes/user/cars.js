var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.render('user/cars', { title: 'cars', page: 'cars' });
});

module.exports = router;
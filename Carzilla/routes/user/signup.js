var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.render('user/signup', { title: 'signup', page: 'signup' });
});

module.exports = router;
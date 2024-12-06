var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.render('user/login', { title: 'login', page: 'login' });
});

module.exports = router;
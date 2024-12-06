var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.render('user/about', { title: 'about', page: 'about' });
});

module.exports = router;
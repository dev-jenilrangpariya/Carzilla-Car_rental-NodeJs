var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.render('user/policy', { title: 'about', page: 'policy' });
});

module.exports = router;
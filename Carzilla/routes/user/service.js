var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.render('user/service', { title: 'service', page: 'service' });
});

module.exports = router;
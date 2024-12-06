var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.render('user/error', { title: 'error', page: 'error' });
});

module.exports = router;
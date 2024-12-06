var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.render('user/feature', { title: 'feature', page: 'feature' });
});

module.exports = router;
var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.render('user/pass_reset', { title: 'pass_reset', page: 'pass_reset' });
});

module.exports = router;
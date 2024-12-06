var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.render('user/team', { title: 'team', page: 'team' });
});

module.exports = router;
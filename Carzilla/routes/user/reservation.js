var express = require('express');
var router = express.Router();
const auth = require('../../src/middleware/auth');

router.get('/', auth, function (req, res) {
    res.render('user/reservation', { title: 'reservation', page: 'reservation' });
});

module.exports = router;
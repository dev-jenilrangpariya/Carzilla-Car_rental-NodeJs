var express = require('express');
var router = express.Router();
const app = express();

// ... other code

router.get('/', function (req, res, next) {
  res.render('user/index', { title: 'index', page: 'index' });
});

app.get('/about', (_, resp) => {
  resp.render('about');
});

module.exports = router;
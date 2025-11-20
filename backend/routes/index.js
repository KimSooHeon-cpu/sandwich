var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Express 서버 정상 작동!'); // 혹은 원하는 문자열/JSON 등
});

module.exports = router;

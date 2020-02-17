var express = require('express');
var router = express.Router();
const cors = require('cors')

router.use(cors())
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('get from api')
  const response = { nickname: 'Petch', age: 21, message: 'this is web Petch'};
  console.log(response);
  res.json (response);
});

module.exports = router;

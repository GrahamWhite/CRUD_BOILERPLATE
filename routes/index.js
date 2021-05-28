var express = require('express');
var router = express.Router();
var env = require('dotenv');
// var crypt = require('bcrypt');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login' });
});

router.post('/login' , async function (req, res, next) {
  // let hash = await crypt.hash(req.body.password, 10);

  console.log("Username: " + req.body.username);
  console.log("Password: " + req.body.password);
  // console.log("Password Hash: " + hash);

  res.render('login_page', {title: 'Welcome'})

});
module.exports = router;

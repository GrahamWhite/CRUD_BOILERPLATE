var express = require('express');
const connection = require("../controllers/connection_module");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('new_landing_page', { title: 'Landing Page' });
});

router.get('/dev', function (req, res){
  res.render('dev_page', {title: 'Development Page'});
});

router.get( '/gameoflife', function (req, res){
  res.render('game_of_life_page', {title: 'Game of Life'});
});

router.get( '/matrix', function (req, res){
  res.render('matrix_page', {title: 'Game of Life'});
});

router.get( '/neuralnetwork', function (req, res){
  res.render('neural_network_page', {title: 'Game of Life'});
});


router.post('/login', async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let errors = [];

  try{
    if(!username)
      errors.push({msg: 'username not provided'})
    if(!password)
      errors.push({msg: 'password not provided'})

    console.log('Username: ' + username);
    console.log('Password: ' + password);

    //SQL Connection

  }catch (err){
    errors.push({msg: err});
  }

  if(errors.length > 0){

    errors.forEach(error => {
      console.error(error.msg);
    });

    res.send({errors: errors});
  }
});

module.exports = router;

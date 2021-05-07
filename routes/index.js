var express = require('express');
const {handlebars} = require('hbs');
var router = express.Router();
const Cube = require('../models/cube');



/* GET home page */
router.get('/', function(req, res, next) {
  Cube.find().then((cube) => {
    res.render('index', {title:"Cubicle", cube: cube})
  })
});

module.exports = router;


//TASKS TO DO

//auth on : create, createAccessory, logout, attachAccessory
//auth by user on edit & delete
//sanitization
